#import <React/RCTBridgeModule.h>
#import <Security/Security.h>

@interface SecureStorage : NSObject<RCTBridgeModule>
@end

@implementation SecureStorage

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

- (NSMutableDictionary *)_queryForKey:(NSString *)key {
    return [@{
        (__bridge id)kSecClass: (__bridge id)kSecClassGenericPassword,
        (__bridge id)kSecAttrAccount: key,
        (__bridge id)kSecAttrService: @"org.jitsi.meet.securestorage"
    } mutableCopy];
}

RCT_EXPORT_METHOD(getItem:(NSString *)key
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject) {
    NSMutableDictionary *query = [self _queryForKey:key];

    query[(__bridge id)kSecMatchLimit] = (__bridge id)kSecMatchLimitOne;
    query[(__bridge id)kSecReturnData] = @YES;

    CFTypeRef itemRef = NULL;
    OSStatus status = SecItemCopyMatching((__bridge CFDictionaryRef)query, &itemRef);

    if (status == errSecItemNotFound) {
        resolve(nil);
        return;
    }

    if (status != errSecSuccess) {
        NSError *error = [NSError errorWithDomain:NSOSStatusErrorDomain
                                             code:status
                                         userInfo:nil];

        reject(@"E_SECURE_STORAGE_GET", error.localizedDescription, error);
        return;
    }

    NSData *valueData = (__bridge_transfer NSData *)itemRef;
    NSString *value = [[NSString alloc] initWithData:valueData encoding:NSUTF8StringEncoding];

    resolve(value);
}

RCT_EXPORT_METHOD(removeItems:(NSArray<NSString *> *)keys
                  resolve:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject) {
    for (NSString *key in keys) {
        if (![key isKindOfClass:NSString.class] || key.length == 0) {
            continue;
        }

        OSStatus status = SecItemDelete((__bridge CFDictionaryRef)[self _queryForKey:key]);

        if (status != errSecSuccess && status != errSecItemNotFound) {
            NSError *error = [NSError errorWithDomain:NSOSStatusErrorDomain
                                                 code:status
                                             userInfo:nil];

            reject(@"E_SECURE_STORAGE_REMOVE", error.localizedDescription, error);
            return;
        }
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(setItem:(NSString *)key
                  value:(NSString *)value
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    NSMutableDictionary *query = [self _queryForKey:key];
    NSData *valueData = [value dataUsingEncoding:NSUTF8StringEncoding];

    SecItemDelete((__bridge CFDictionaryRef)query);

    query[(__bridge id)kSecAttrAccessible] = (__bridge id)kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly;
    query[(__bridge id)kSecValueData] = valueData;

    OSStatus status = SecItemAdd((__bridge CFDictionaryRef)query, nil);

    if (status != errSecSuccess) {
        NSError *error = [NSError errorWithDomain:NSOSStatusErrorDomain
                                             code:status
                                         userInfo:nil];

        reject(@"E_SECURE_STORAGE_SET", error.localizedDescription, error);
        return;
    }

    resolve(nil);
}

@end
