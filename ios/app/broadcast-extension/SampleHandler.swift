/*
 * Copyright @ 2021-present 8x8, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ReplayKit

private enum Constants {
    static let appGroupIdentifierInfoDictionaryKey = "RTCAppGroupIdentifier"
    static let fallbackAppGroupIdentifier = "group.com.fangxinban.meet"
    static let socketFileName = "rtc_SSFD"
    static let screenShareStopRequestedFileName = "rtc_SS_STOP"
    static let stopBroadcastErrorDomain = "org.jitsi.meet.broadcast"
    static let stopBroadcastErrorDescription = "Screen sharing stopped"
}

class SampleHandler: RPBroadcastSampleHandler {
    
    private var clientConnection: SocketConnection?
    private var uploader: SampleUploader?
    private var isBroadcastActive = false
    
    private var frameCount: Int = 0

    var appGroupIdentifier: String {
        Bundle.main.object(forInfoDictionaryKey: Constants.appGroupIdentifierInfoDictionaryKey) as? String
            ?? Constants.fallbackAppGroupIdentifier
    }

    var sharedContainerURL: URL? {
        FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupIdentifier)
    }
    
    var socketFilePath: String {
        sharedContainerURL?.appendingPathComponent(Constants.socketFileName).path ?? ""
    }

    var stopRequestFileURL: URL? {
        sharedContainerURL?.appendingPathComponent(Constants.screenShareStopRequestedFileName)
    }
    
    override init() {
      super.init()
        if let connection = SocketConnection(filePath: socketFilePath) {
          clientConnection = connection
          setupConnection()
          
          uploader = SampleUploader(connection: connection)
        }
    }

    override func broadcastStarted(withSetupInfo setupInfo: [String: NSObject]?) {
        // User has requested to start the broadcast. Setup info from the UI extension can be supplied but optional.
        print("broadcast started")
        
        isBroadcastActive = true
        frameCount = 0
        setStopRequested(false)
        
        DarwinNotificationCenter.shared.postNotification(.broadcastStarted)
        openConnection()
    }
    
    override func broadcastPaused() {
        // User has requested to pause the broadcast. Samples will stop being delivered.
    }
    
    override func broadcastResumed() {
        // User has requested to resume the broadcast. Samples delivery will resume.
    }
    
    override func broadcastFinished() {
        // User has requested to finish the broadcast.
        isBroadcastActive = false
        setStopRequested(true)
        DarwinNotificationCenter.shared.postNotification(.broadcastStopped)
        clientConnection?.close()
    }
    
    override func processSampleBuffer(_ sampleBuffer: CMSampleBuffer, with sampleBufferType: RPSampleBufferType) {
        switch sampleBufferType {
        case RPSampleBufferType.video:
            // very simple mechanism for adjusting frame rate by using every third frame
            frameCount += 1
            if frameCount % 3 == 0 {
                uploader?.send(sample: sampleBuffer)
            }
        default:
            break
        }
    }
}

private extension SampleHandler {
  
    func setupConnection() {
        clientConnection?.didClose = { [weak self] error in
            print("client connection did close \(String(describing: error))")

            guard let self = self else {
                return
            }

            if let error = error {
                self.setStopRequested(true)
                self.isBroadcastActive = false
                self.finishBroadcastWithError(error)
            } else if self.shouldStopBroadcastOnDisconnect() {
                self.stopBroadcast()
            } else if self.isBroadcastActive {
                self.openConnection()
            } else {
                print("client connection closed after broadcast finished")
            }
        }
    }

    func setStopRequested(_ stopRequested: Bool) {
        guard
            let stopRequestFileURL = stopRequestFileURL,
            let data = (stopRequested ? "1" : "0").data(using: .utf8)
        else {
            return
        }

        try? data.write(to: stopRequestFileURL, options: .atomic)
    }

    func shouldStopBroadcastOnDisconnect() -> Bool {
        guard
            isBroadcastActive,
            let stopRequestFileURL = stopRequestFileURL,
            let data = try? Data(contentsOf: stopRequestFileURL),
            let value = String(data: data, encoding: .utf8)
        else {
            return false
        }

        return value == "1"
    }

    func stopBroadcast() {
        isBroadcastActive = false

        let error = NSError(
            domain: Constants.stopBroadcastErrorDomain,
            code: 0,
            userInfo: [ NSLocalizedDescriptionKey: Constants.stopBroadcastErrorDescription ])

        finishBroadcastWithError(error)
    }

    func openConnection() {
        let queue = DispatchQueue(label: "broadcast.connectTimer")
        let timer = DispatchSource.makeTimerSource(queue: queue)
        timer.schedule(deadline: .now(), repeating: .milliseconds(100), leeway: .milliseconds(500))
        timer.setEventHandler { [weak self] in
            guard self?.clientConnection?.open() == true else {
                return
            }
            
            timer.cancel()
        }
        
        timer.resume()
    }
}
