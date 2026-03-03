Run echo "=== Last 300 lines of build log ==="
=== Last 300 lines of build log ===
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIKitCore.h:13:9: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIKitCore.h:13:
#import <UIKit/UIColor.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIColor.h:13:9: error: could not build module 'CoreImage'
#import <CoreImage/CoreImage.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:9: note: while building module 'UIKit' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:
#import <UIKit/UIKit.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIView.h:10:9: note: while building module 'QuartzCore' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIView.h:10:
#import <QuartzCore/QuartzCore.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:9: note: while building module 'UIKit' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:
#import <UIKit/UIKit.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIView.h:10:9: note: while building module 'QuartzCore' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIView.h:10:
#import <QuartzCore/QuartzCore.h>
        ^
<module-includes>:1:9: note: in file included from <module-includes>:1:
#import "Headers/QuartzCore.h"
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/QuartzCore.framework/Headers/QuartzCore.h:20:10: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/QuartzCore.framework/Headers/QuartzCore.h:20:
#include <QuartzCore/CoreAnimation.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/QuartzCore.framework/Headers/CoreAnimation.h:22:9: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/QuartzCore.framework/Headers/CoreAnimation.h:22:
#import <QuartzCore/CAEAGLLayer.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/QuartzCore.framework/Headers/CAEAGLLayer.h:11:9: error: could not build module 'OpenGLES'
#import <OpenGLES/EAGLDrawable.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:9: note: while building module 'UIKit' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:
#import <UIKit/UIKit.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIImageView.h:14:9: note: while building module 'Symbols' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIImageView.h:14:
#import <Symbols/NSSymbolEffect.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:9: note: while building module 'UIKit' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:
#import <UIKit/UIKit.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/NSFileProviderExtension.h:15:9: note: while building module 'FileProvider' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/NSFileProviderExtension.h:15:
#import <FileProvider/NSFileProviderExtension.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:9: note: while building module 'UIKit' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:
#import <UIKit/UIKit.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UNNotificationResponse+UIKitAdditions.h:10:9: note: while building module 'UserNotifications' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UNNotificationResponse+UIKitAdditions.h:10:
#import <UserNotifications/UNNotificationResponse.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
<module-includes>:1:9: note: in file included from <module-includes>:1:
#import "Headers/ReplayKit.h"
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:9: error: could not build module 'UIKit'
#import <UIKit/UIKit.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVContentKeySession.h:10:9: note: while building module 'CoreMedia' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVContentKeySession.h:10:
#import <CoreMedia/CMSampleBuffer.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/CoreMedia.framework/Headers/CMFormatDescription.h:26:10: note: while building module 'CoreAudio' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/CoreMedia.framework/Headers/CMFormatDescription.h:26:
#include <CoreAudio/CoreAudioTypes.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVContentKeySession.h:10:9: note: while building module 'CoreMedia' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVContentKeySession.h:10:
#import <CoreMedia/CMSampleBuffer.h>
        ^
<module-includes>:1:9: note: in file included from <module-includes>:1:
#import "Headers/CoreMedia.h"
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/CoreMedia.framework/Headers/CoreMedia.h:15:10: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/CoreMedia.framework/Headers/CoreMedia.h:15:
#include <CoreMedia/CMFormatDescription.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/CoreMedia.framework/Headers/CMFormatDescription.h:26:10: error: could not build module 'CoreAudio'
#include <CoreAudio/CoreAudioTypes.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
<module-includes>:1:9: note: in file included from <module-includes>:1:
#import "Headers/AVFoundation.h"
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVFoundation.h:13:9: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVFoundation.h:13:
#import <AVFoundation/AVFCore.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVFCore.h:15:9: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVFCore.h:15:
#import <AVFoundation/AVAsset.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAsset.h:14:9: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAsset.h:14:
#import <AVFoundation/AVContentKeySession.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVContentKeySession.h:10:9: error: could not build module 'CoreMedia'
#import <CoreMedia/CMSampleBuffer.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAssetWriter.h:19:9: note: while building module 'UniformTypeIdentifiers' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAssetWriter.h:19:
#import <UniformTypeIdentifiers/UTType.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAudioMix.h:21:9: note: while building module 'MediaToolbox' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAudioMix.h:21:
#import <MediaToolbox/MTAudioProcessingTap.h>
        ^
<module-includes>:1:9: note: in file included from <module-includes>:1:
#import "Headers/MediaToolbox.h"
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MediaToolbox.h:11:10: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MediaToolbox.h:11:
#include <MediaToolbox/MTAudioProcessingTap.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MTAudioProcessingTap.h:13:10: error: could not build module 'CoreMedia'
#include <CoreMedia/CMBase.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAudioMix.h:21:9: note: while building module 'MediaToolbox' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAudioMix.h:21:
#import <MediaToolbox/MTAudioProcessingTap.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MTAudioProcessingTap.h:15:10: note: while building module 'AudioToolbox' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MTAudioProcessingTap.h:15:
#include <AudioToolbox/AudioToolbox.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAudioMix.h:21:9: note: while building module 'MediaToolbox' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAudioMix.h:21:
#import <MediaToolbox/MTAudioProcessingTap.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MTAudioProcessingTap.h:15:10: note: while building module 'AudioToolbox' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MTAudioProcessingTap.h:15:
#include <AudioToolbox/AudioToolbox.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AudioToolbox.framework/Headers/AUAudioUnit.h:17:9: note: while building module 'CoreMIDI' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AudioToolbox.framework/Headers/AUAudioUnit.h:17:
#import <CoreMIDI/MIDIServices.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAudioMix.h:21:9: note: while building module 'MediaToolbox' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVAudioMix.h:21:
#import <MediaToolbox/MTAudioProcessingTap.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MTAudioProcessingTap.h:15:10: note: while building module 'AudioToolbox' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MTAudioProcessingTap.h:15:
#include <AudioToolbox/AudioToolbox.h>
         ^
<module-includes>:1:9: note: in file included from <module-includes>:1:
#import "Headers/AudioToolbox.h"
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AudioToolbox.framework/Headers/AudioToolbox.h:18:10: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AudioToolbox.framework/Headers/AudioToolbox.h:18:
#include <AudioToolbox/AUAudioUnit.h>
         ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AudioToolbox.framework/Headers/AUAudioUnit.h:17:9: error: could not build module 'CoreMIDI'
#import <CoreMIDI/MIDIServices.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVFAudio.h:8:9: note: while building module 'AVFAudio' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVFAudio.h:8:
#import <AVFAudio/AVFAudio.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:1: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/module.modulemap:13:
extern module SwiftBridging "swift/bridging.modulemap"
^
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
module SwiftBridging {
       ^
/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: note: previously defined here
module SwiftBridging {
       ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:9: note: while building module 'AVFoundation' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/RPBroadcastExtension.h:9:
#import <AVFoundation/AVFoundation.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVFAudio.h:8:9: note: while building module 'AVFAudio' imported from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVFAudio.h:8:
#import <AVFAudio/AVFAudio.h>
        ^
<module-includes>:1:9: note: in file included from <module-includes>:1:
#import "Headers/AVFAudio.h"
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFAudio.framework/Headers/AVFAudio.h:8:9: note: in file included from /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFAudio.framework/Headers/AVFAudio.h:8:
#import <AVFAudio/AVAudioFormat.h>
        ^
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFAudio.framework/Headers/AVAudioFormat.h:12:9: error: could not build module 'CoreMedia'
#import <CoreMedia/CMFormatDescription.h>
        ^
/Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/SampleUploader.swift:18:8: error: could not build Objective-C module 'ReplayKit'
import ReplayKit
       ^

SwiftCompile normal arm64 Compiling\ Atomic.swift /Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/Atomic.swift (in target 'JitsiMeetBroadcastExtension' from project 'app')
    cd /Users/runner/work/jitsi-meet/jitsi-meet/ios/app
    builtin-swiftTaskExecution -- /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift-frontend -frontend -c /Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/SocketConnection.swift /Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/SampleUploader.swift /Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/DarwinNotificationCenter.swift /Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/SampleHandler.swift -primary-file /Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/Atomic.swift -emit-dependencies-path /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/Objects-normal/arm64/Atomic.d -emit-const-values-path /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/Objects-normal/arm64/Atomic.swiftconstvalues -emit-reference-dependencies-path /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/Objects-normal/arm64/Atomic.swiftdeps -serialize-diagnostics-path /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/Objects-normal/arm64/Atomic.dia -target arm64-apple-ios14.4-simulator -Xllvm -aarch64-use-tbi -enable-objc-interop -sdk /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk -I /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Products/Debug-iphonesimulator -F /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Products/Debug-iphonesimulator -no-color-diagnostics -application-extension -enable-testing -g -debug-info-format\=dwarf -dwarf-version\=4 -module-cache-path /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/ModuleCache.noindex -swift-version 5 -enforce-exclusivity\=checked -Onone -D DEBUG -serialize-debugging-options -const-gather-protocols-file /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/Objects-normal/arm64/JitsiMeetBroadcastExtension_const_extract_protocols.json -enable-experimental-feature DebugDescriptionMacro -enable-experimental-feature OpaqueTypeErasure -enable-bare-slash-regex -empty-abi-descriptor -validate-clang-modules-once -clang-build-session-file /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/ModuleCache.noindex/Session.modulevalidation -Xcc -working-directory -Xcc /Users/runner/work/jitsi-meet/jitsi-meet/ios/app -resource-dir /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/swift -enable-anonymous-context-mangled-names -file-compilation-dir /Users/runner/work/jitsi-meet/jitsi-meet/ios/app -Xcc -D_LIBCPP_HARDENING_MODE\=_LIBCPP_HARDENING_MODE_DEBUG -Xcc -ivfsstatcache -Xcc /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/SDKStatCaches.noindex/iphonesimulator18.2-22C146-16b5fc1f628d844b188c57a1ba9d6a81.sdkstatcache -Xcc -I/Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/swift-overrides.hmap -Xcc -iquote -Xcc /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/JitsiMeetBroadcastExtension-generated-files.hmap -Xcc -I/Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/JitsiMeetBroadcastExtension-own-target-headers.hmap -Xcc -I/Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/JitsiMeetBroadcastExtension-all-non-framework-target-headers.hmap -Xcc -ivfsoverlay -Xcc /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/app-c8ea3afa4348e6caf47cdc9505cc51d8-VFS-iphonesimulator/all-product-headers.yaml -Xcc -iquote -Xcc /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/JitsiMeetBroadcastExtension-project-headers.hmap -Xcc -I/Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Products/Debug-iphonesimulator/include -Xcc -I/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include -Xcc -I/Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/DerivedSources-normal/arm64 -Xcc -I/Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/DerivedSources/arm64 -Xcc -I/Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/DerivedSources -Xcc -DDEBUG\=1 -Xcc -D_LIBCPP_ENABLE_CXX17_REMOVED_UNARY_BINARY_FUNCTION -module-name JitsiMeetBroadcastExtension -frontend-parseable-output -disable-clang-spi -target-sdk-version 18.2 -target-sdk-name iphonesimulator18.2 -external-plugin-path /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/usr/lib/swift/host/plugins\#/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin/swift-plugin-server -external-plugin-path /Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/usr/local/lib/swift/host/plugins\#/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin/swift-plugin-server -plugin-path /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/swift/host/plugins -plugin-path /Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/local/lib/swift/host/plugins -o /Users/runner/work/jitsi-meet/jitsi-meet/ios/build/Build/Intermediates.noindex/app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/Objects-normal/arm64/Atomic.o -index-unit-output-path /app.build/Debug-iphonesimulator/JitsiMeetBroadcastExtension.build/Objects-normal/arm64/Atomic.o
Command SwiftCompile failed with a nonzero exit code

/Users/runner/work/jitsi-meet/jitsi-meet/ios/app/app.xcodeproj: warning: Multiple targets match implicit dependency for product reference 'JitsiMeetSDK.framework'. Consider adding an explicit dependency on the intended target to resolve this ambiguity. (in target 'JitsiMeet' from project 'app')
    note: Target 'JitsiMeetSDK' (in project 'sdk')
    note: Target 'JitsiMeetSDKLite' (in project 'sdk')
/Users/runner/work/jitsi-meet/jitsi-meet/ios/app/app.xcodeproj: warning: Multiple targets match implicit dependency for product reference 'JitsiMeetSDK.framework'. Consider adding an explicit dependency on the intended target to resolve this ambiguity. (in target 'JitsiMeet' from project 'app')
    note: Target 'JitsiMeetSDK' (in project 'sdk')
    note: Target 'JitsiMeetSDKLite' (in project 'sdk')
note: Run script build phase 'Run React packager' will be run during every build because the option to run the script phase "Based on dependency analysis" is unchecked. (in target 'JitsiMeet' from project 'app')
note: Run script build phase 'Update App Entitlements' will be run during every build because the option to run the script phase "Based on dependency analysis" is unchecked. (in target 'JitsiMeet' from project 'app')
note: Run script build phase 'Setup Google reverse URL handler' will be run during every build because the option to run the script phase "Based on dependency analysis" is unchecked. (in target 'JitsiMeet' from project 'app')
note: Run script build phase 'Setup Dropbox' will be run during every build because the option to run the script phase "Based on dependency analysis" is unchecked. (in target 'JitsiMeet' from project 'app')
note: Run script build phase 'Adjust ATS' will be run during every build because the option to run the script phase "Based on dependency analysis" is unchecked. (in target 'JitsiMeet' from project 'app')
** BUILD FAILED **


The following build commands failed:
	SwiftEmitModule normal arm64 Emitting\ module\ for\ JitsiMeetBroadcastExtension (in target 'JitsiMeetBroadcastExtension' from project 'app')
	EmitSwiftModule normal arm64 (in target 'JitsiMeetBroadcastExtension' from project 'app')
	SwiftCompile normal arm64 Compiling\ Atomic.swift /Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/Atomic.swift (in target 'JitsiMeetBroadcastExtension' from project 'app')
	Building workspace jitsi-meet with scheme JitsiMeet and configuration Debug
(4 failures)
=== All errors ===
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Shared/Handwritten/OAuth/DBSDKKeychain.m:234:64: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Shared/Handwritten/OAuth/DBSDKKeychain.m:278:32: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Platform/ObjectiveDropboxOfficial_iOS/OfficialPartners/OpenWith/DBOpenWithInfo-iOS.m:50:53: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Platform/ObjectiveDropboxOfficial_iOS/OfficialPartners/OpenWith/DBOpenWithInfo-iOS.m:55:35: warning: 'archivedDataWithRootObject:' is deprecated: first deprecated in iOS 12.0 - Use +archivedDataWithRootObject:requiringSecureCoding:error: instead [-Wdeprecated-declarations]
   47 | + (NSData *)archivedDataWithRootObject:(id)rootObject API_DEPRECATED("Use +archivedDataWithRootObject:requiringSecureCoding:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Platform/ObjectiveDropboxOfficial_iOS/OfficialPartners/OpenWith/DBOfficialAppConnector-iOS.m:68:47: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Shared/Handwritten/OAuth/DBAccessToken+NSSecureCoding.m:15:36: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Shared/Handwritten/OAuth/DBAccessToken+NSSecureCoding.m:28:29: warning: 'archivedDataWithRootObject:' is deprecated: first deprecated in iOS 12.0 - Use +archivedDataWithRootObject:requiringSecureCoding:error: instead [-Wdeprecated-declarations]
   47 | + (NSData *)archivedDataWithRootObject:(id)rootObject API_DEPRECATED("Use +archivedDataWithRootObject:requiringSecureCoding:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Shared/Handwritten/OAuth/DBSDKKeychain.m:234:64: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Shared/Handwritten/OAuth/DBSDKKeychain.m:278:32: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Platform/ObjectiveDropboxOfficial_iOS/OfficialPartners/OpenWith/DBOpenWithInfo-iOS.m:50:53: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Platform/ObjectiveDropboxOfficial_iOS/OfficialPartners/OpenWith/DBOpenWithInfo-iOS.m:55:35: warning: 'archivedDataWithRootObject:' is deprecated: first deprecated in iOS 12.0 - Use +archivedDataWithRootObject:requiringSecureCoding:error: instead [-Wdeprecated-declarations]
   47 | + (NSData *)archivedDataWithRootObject:(id)rootObject API_DEPRECATED("Use +archivedDataWithRootObject:requiringSecureCoding:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Platform/ObjectiveDropboxOfficial_iOS/OfficialPartners/OpenWith/DBOfficialAppConnector-iOS.m:68:47: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Shared/Handwritten/OAuth/DBAccessToken+NSSecureCoding.m:15:36: warning: 'unarchiveObjectWithData:' is deprecated: first deprecated in iOS 12.0 - Use +unarchivedObjectOfClass:fromData:error: instead [-Wdeprecated-declarations]
  154 | + (nullable id)unarchiveObjectWithData:(NSData *)data API_DEPRECATED("Use +unarchivedObjectOfClass:fromData:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Users/runner/work/jitsi-meet/jitsi-meet/ios/Pods/ObjectiveDropboxOfficial/Source/ObjectiveDropboxOfficial/Shared/Handwritten/OAuth/DBAccessToken+NSSecureCoding.m:28:29: warning: 'archivedDataWithRootObject:' is deprecated: first deprecated in iOS 12.0 - Use +archivedDataWithRootObject:requiringSecureCoding:error: instead [-Wdeprecated-declarations]
   47 | + (NSData *)archivedDataWithRootObject:(id)rootObject API_DEPRECATED("Use +archivedDataWithRootObject:requiringSecureCoding:error: instead", macosx(10.2,10.14), ios(2.0,12.0), watchos(2.0,5.0), tvos(9.0,12.0));
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/CoreVideo.framework/Headers/CVPixelBufferIOSurface.h:26:10: error: could not build module 'IOSurface'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/Metal.framework/Headers/MTLTexture.h:15:9: error: could not build module 'IOSurface'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/CoreImage.framework/Headers/CIImage.h:15:9: error: could not build module 'CoreVideo'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/UIKit.framework/Headers/UIColor.h:13:9: error: could not build module 'CoreImage'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/QuartzCore.framework/Headers/CAEAGLLayer.h:11:9: error: could not build module 'OpenGLES'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/ReplayKit.framework/Headers/ReplayKit.h:13:9: error: could not build module 'UIKit'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/CoreMedia.framework/Headers/CMFormatDescription.h:26:10: error: could not build module 'CoreAudio'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFoundation.framework/Headers/AVContentKeySession.h:10:9: error: could not build module 'CoreMedia'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/MediaToolbox.framework/Headers/MTAudioProcessingTap.h:13:10: error: could not build module 'CoreMedia'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AudioToolbox.framework/Headers/AUAudioUnit.h:17:9: error: could not build module 'CoreMIDI'
/Applications/Xcode_16.2.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/swift/bridging.modulemap:13:8: error: redefinition of module 'SwiftBridging'
/Applications/Xcode_16.2.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator18.2.sdk/System/Library/Frameworks/AVFAudio.framework/Headers/AVAudioFormat.h:12:9: error: could not build module 'CoreMedia'
/Users/runner/work/jitsi-meet/jitsi-meet/ios/app/broadcast-extension/SampleUploader.swift:18:8: error: could not build Objective-C module 'ReplayKit'
** BUILD FAILED **
=== Build directory contents ===
total 0
drwxr-xr-x@   3 runner  staff    96 Mar  3 15:35 .
drwxr-xr-x    4 runner  staff   128 Mar  3 15:35 ..
drwxr-xr-x@ 123 runner  staff  3936 Mar  3 16:07 Debug-iphonesimulator