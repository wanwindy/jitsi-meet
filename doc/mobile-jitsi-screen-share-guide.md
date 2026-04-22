# 移动端 Jitsi 会议接入与屏幕共享优化说明

## 1. 文档目的

本文档用于指导 iOS / Android App 调整 Jitsi 会议接入方式，重点解决以下问题：

* 两人会议时参会人共享屏幕，主持人端看到的画面模糊
* 服务端已经调高共享屏幕参数，但 App 实际观感变化不明显
* 业务登录成功后，App 进入会议仍然需要把 Jitsi 会议参数显式传进去

本文档只聚焦：

* App 侧会议参数覆盖
* Android / iOS 会议接入代码示意
* 联调与验证方法

不讨论：

* 账号绑定设备
* 业务登录态
* 管理后台

---

## 2. 当前线上结论

当前线上 Jitsi 服务端已经完成以下调整：

* 关闭两人会议 `P2P`
* 首选分辨率提高到 `1080p`
* 屏幕共享帧率提高到 `10 ~ 30fps`
* 提高屏幕共享和高分辨率视频的码率上限

但最新联调结果表明：

* App 实际建会时，移动端仍然可能按自己的 SDK 默认值建立会议
* 共享屏幕实际仍可能继续走 `AV1`
* 仅修改服务端 `config.js`，不一定足够

所以当前最重要的结论是：

**必须同时修改 App 侧 Jitsi 会议参数。**

---

## 3. 为什么只改服务端不够

Jitsi 官方配置支持两种来源：

1. 服务端 `config.js`
2. App / SDK 侧 `configOverride`

在自定义移动端里，SDK 最终建会时可能会：

* 覆盖服务端部分配置
* 忽略旧版本不支持或未正确透传的配置
* 使用 App 本地默认 codec 顺序

这就是为什么：

* 服务端明明已经改成 `P2P=false`
* 服务端明明已经把共享参数调高
* 但实际会议里共享屏幕观感仍然没明显变化

---

## 4. App 端必须下发的会议配置

建议 App 在“创建会议 / 加入会议”时，统一覆盖以下参数：

```json
{
  "p2p.enabled": false,
  "resolution": 1080,
  "maxFullResolutionParticipants": -1,
  "constraints.video.height": {
    "ideal": 1080,
    "max": 1080,
    "min": 720
  },
  "constraints.video.width": {
    "ideal": 1920,
    "max": 1920,
    "min": 1280
  },
  "desktopSharingFrameRate": {
    "min": 10,
    "max": 30
  },
  "videoQuality.codecPreferenceOrder": [
    "VP8",
    "H264",
    "VP9"
  ],
  "videoQuality.mobileCodecPreferenceOrder": [
    "VP8",
    "H264",
    "VP9"
  ]
}
```

---

## 5. 参数解释

### 5.1 `p2p.enabled = false`

必须关闭。

原因：

* 你当前真实场景是跨区域链路
* 两人会议默认可能直连
* 直连成功后会绕过 JVB
* 绕过桥以后，前面服务端对桥接链路做的优化收益会明显下降

### 5.2 `resolution = 1080`

用于提高本地视频采集和发送时的期望分辨率。

### 5.3 `maxFullResolutionParticipants = -1`

避免因为参与人数判断过早把接收端降到非全分辨率。

### 5.4 `desktopSharingFrameRate = { min: 10, max: 30 }`

当前建议上限保持在 `30fps`。

说明：

* `30fps` 已经是偏激进配置
* 继续硬抬到 `60fps`，通常会先放大跨区域丢包、码率波动、终端编码压力
* 当前问题更优先的是 codec 路径和链路稳定性，不是继续强行抬帧率

### 5.5 `videoQuality.codecPreferenceOrder`

桌面端顺序建议：

* `VP8`
* `H264`
* `VP9`

### 5.6 `videoQuality.mobileCodecPreferenceOrder`

移动端顺序建议：

* `VP8`
* `H264`
* `VP9`

这样做的目的，是尽量避免共享屏幕继续优先走 `AV1`。

---

## 6. Android 接入示意

Android 官方 SDK 的 `JitsiMeetConferenceOptions.Builder` 支持 `setConfigOverride`，可以传：

* `String`
* `int`
* `boolean`
* `Bundle`
* `String[]`

所以 Android 侧建议把会议配置封装成一个公共方法，每次进会都统一下发。

### 6.1 Kotlin 示例

```kotlin
import android.os.Bundle
import org.jitsi.meet.sdk.JitsiMeetConferenceOptions
import org.jitsi.meet.sdk.JitsiMeetActivity
import java.net.URL

private fun buildJitsiOverrides(): JitsiMeetConferenceOptions.Builder {
    val videoHeight = Bundle().apply {
        putInt("ideal", 1080)
        putInt("max", 1080)
        putInt("min", 720)
    }

    val videoWidth = Bundle().apply {
        putInt("ideal", 1920)
        putInt("max", 1920)
        putInt("min", 1280)
    }

    val videoConstraints = Bundle().apply {
        putBundle("height", videoHeight)
        putBundle("width", videoWidth)
    }

    val constraints = Bundle().apply {
        putBundle("video", videoConstraints)
    }

    val desktopSharingFrameRate = Bundle().apply {
        putInt("min", 10)
        putInt("max", 30)
    }

    return JitsiMeetConferenceOptions.Builder()
        .setServerURL(URL("https://fangxinbanmeet.com"))
        .setFeatureFlag("welcomepage.enabled", false)
        .setConfigOverride("p2p.enabled", false)
        .setConfigOverride("resolution", 1080)
        .setConfigOverride("maxFullResolutionParticipants", -1)
        .setConfigOverride("constraints", constraints)
        .setConfigOverride("desktopSharingFrameRate", desktopSharingFrameRate)
        .setConfigOverride(
            "videoQuality.codecPreferenceOrder",
            arrayOf("VP8", "H264", "VP9")
        )
        .setConfigOverride(
            "videoQuality.mobileCodecPreferenceOrder",
            arrayOf("VP8", "H264", "VP9")
        )
}

fun joinMeeting(roomName: String) {
    val options = buildJitsiOverrides()
        .setRoom(roomName)
        .build()

    JitsiMeetActivity.launch(context, options)
}
```

### 6.2 Android 侧注意事项

* 统一在一个地方构建默认会议参数，不要在多个页面各自散写
* 如果 App 里还有旧的默认会议配置，先删掉旧的 `AV1` / `P2P=true`
* 如果你们有自己封装的 MeetingManager，也要检查是否在更底层又覆盖了一次参数

---

## 7. iOS 接入示意

iOS 官方 SDK 的 `JitsiMeetConferenceOptionsBuilder` 支持：

* `setConfigOverride:withBoolean:`
* `setConfigOverride:withValue:`
* `setConfigOverride:withDictionary:`
* `setConfigOverride:withArray:`

所以 iOS 侧同样建议统一封装一份会议参数构建逻辑。

### 7.1 Swift 示例

```swift
import JitsiMeetSDK

func buildConferenceOptions(room: String) -> JitsiMeetConferenceOptions {
    return JitsiMeetConferenceOptions.fromBuilder { builder in
        builder.serverURL = URL(string: "https://fangxinbanmeet.com")
        builder.room = room
        builder.welcomePageEnabled = false

        builder.setConfigOverride("p2p.enabled", withBoolean: false)
        builder.setConfigOverride("resolution", withValue: 1080)
        builder.setConfigOverride("maxFullResolutionParticipants", withValue: -1)

        builder.setConfigOverride("constraints", withDictionary: [
            "video": [
                "height": [
                    "ideal": 1080,
                    "max": 1080,
                    "min": 720
                ],
                "width": [
                    "ideal": 1920,
                    "max": 1920,
                    "min": 1280
                ]
            ]
        ])

        builder.setConfigOverride("desktopSharingFrameRate", withDictionary: [
            "min": 10,
            "max": 30
        ])

        builder.setConfigOverride("videoQuality.codecPreferenceOrder", withArray: [
            "VP8",
            "H264",
            "VP9"
        ])

        builder.setConfigOverride("videoQuality.mobileCodecPreferenceOrder", withArray: [
            "VP8",
            "H264",
            "VP9"
        ])
    }
}
```

### 7.2 iOS 侧注意事项

* 共享屏幕的 Broadcast Extension 逻辑不要改坏
* 如果你们已有会议默认参数封装，优先在统一入口修改
* 如果当前使用的是非常旧的 `JitsiMeetSDK` 版本，建议先确认版本，再判断这些参数是否全部支持

---

## 8. 如果不是原生 SDK，而是其他接入方式

### 8.1 Flutter

如果你们使用 Flutter 插件，思路一样：

* 在 `configOverrides` 里传同一组参数
* 不要只改服务端 `config.js`

### 8.2 React Native

如果你们是 React Native 或对官方 RN SDK 再封装：

* 在进入会议前构造统一 `configOverwrite / configOverrides`
* 不要在多个页面分别拼装

### 8.3 WebView

如果你们其实不是原生 SDK，而是 WebView 装会议页：

* 也可以通过 URL hash 或初始化参数显式下发这些配置
* 但原生 SDK 一般比 WebView 更稳定

---

## 9. 联调时必须检查的点

改完后，不要只做“打开旧会议再看一眼”的测试。

建议按下面顺序验证：

1. 删除旧安装包或确保新包已完全覆盖
2. 重新安装 App
3. 新建一个全新的两人会议
4. 由参会人重新开始共享屏幕
5. 主持人观察清晰度和流畅度

重点确认：

* 两端都不是旧包
* 没有复用旧会议连接
* 进入会议时确实用了新的会议配置构建逻辑

---

## 10. 排查清单

如果改完还是没变化，按这个顺序查：

1. App 是否真的把 `configOverride` 传进去了
2. App 是否在更底层又覆盖了一次会议参数
3. 是否仍然把 `AV1` 放在更高优先级
4. 是否仍然默认开启 `P2P`
5. 当前 Jitsi 移动 SDK 版本是否过旧
6. 是否确实重装新包并新建会议验证

---

## 11. 当前推荐策略

当前最省事、最稳的策略是：

1. 服务端继续保持当前配置
2. App 显式传入会议覆盖参数
3. 移动端优先 `VP8 / H264`
4. 保持 `P2P=false`
5. 屏幕共享先保持 `30fps`

先把这一版跑通，再决定后面是否继续做：

* Jitsi 服务端升级到固定稳定版
* 多桥 / 区域桥优化
* 更进一步的跨境网络架构优化

---

## 12. 参考资料

官方资料：

* Android SDK: <https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-android-sdk/>
* iOS SDK: <https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ios-sdk/>
* 配置项说明: <https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-configuration/>

补充说明：

* Android SDK 的 `JitsiMeetConferenceOptions.Builder` 支持 `setConfigOverride`
* iOS SDK 的 `JitsiMeetConferenceOptionsBuilder` 支持 `setConfigOverride`
* 所以这次问题应该优先在 App 侧显式覆盖会议参数，而不是继续只调服务端
