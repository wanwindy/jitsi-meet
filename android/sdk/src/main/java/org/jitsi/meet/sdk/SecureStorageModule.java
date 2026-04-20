package org.jitsi.meet.sdk;

import android.content.Context;
import android.content.SharedPreferences;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;

import java.nio.charset.StandardCharsets;
import java.security.KeyStore;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

@ReactModule(name = SecureStorageModule.NAME)
class SecureStorageModule
    extends ReactContextBaseJavaModule {

    private static final String CIPHER_TRANSFORMATION = "AES/GCM/NoPadding";
    private static final String KEYSTORE_PROVIDER = "AndroidKeyStore";
    private static final String KEY_ALIAS = "org.jitsi.meet.securestorage";
    public static final String NAME = "SecureStorage";
    private static final String PREFERENCES_NAME = "org.jitsi.meet.securestorage";

    private final SharedPreferences sharedPreferences;

    SecureStorageModule(ReactApplicationContext reactContext) {
        super(reactContext);

        sharedPreferences = reactContext.getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getItem(String key, Promise promise) {
        try {
            String encryptedValue = sharedPreferences.getString(key, null);

            if (encryptedValue == null) {
                promise.resolve(null);
                return;
            }

            promise.resolve(decrypt(encryptedValue));
        } catch (Exception e) {
            promise.reject("E_SECURE_STORAGE_GET", "Failed to read secure storage item.", e);
        }
    }

    @ReactMethod
    public void removeItems(ReadableArray keys, Promise promise) {
        try {
            SharedPreferences.Editor editor = sharedPreferences.edit();

            for (int i = 0; i < keys.size(); i++) {
                String key = keys.getString(i);

                if (key != null) {
                    editor.remove(key);
                }
            }

            editor.apply();
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("E_SECURE_STORAGE_REMOVE", "Failed to clear secure storage items.", e);
        }
    }

    @ReactMethod
    public void setItem(String key, String value, Promise promise) {
        try {
            sharedPreferences.edit()
                .putString(key, encrypt(value))
                .apply();
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("E_SECURE_STORAGE_SET", "Failed to persist secure storage item.", e);
        }
    }

    private String decrypt(String serializedPayload) throws Exception {
        String[] parts = serializedPayload.split(":", 2);

        if (parts.length != 2) {
            throw new IllegalStateException("Malformed encrypted payload.");
        }

        byte[] iv = Base64.decode(parts[0], Base64.NO_WRAP);
        byte[] encryptedBytes = Base64.decode(parts[1], Base64.NO_WRAP);
        Cipher cipher = Cipher.getInstance(CIPHER_TRANSFORMATION);

        cipher.init(Cipher.DECRYPT_MODE, getOrCreateSecretKey(), new GCMParameterSpec(128, iv));

        return new String(cipher.doFinal(encryptedBytes), StandardCharsets.UTF_8);
    }

    private String encrypt(String value) throws Exception {
        Cipher cipher = Cipher.getInstance(CIPHER_TRANSFORMATION);

        cipher.init(Cipher.ENCRYPT_MODE, getOrCreateSecretKey());

        byte[] iv = cipher.getIV();
        byte[] encryptedBytes = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));

        return Base64.encodeToString(iv, Base64.NO_WRAP)
            + ":"
            + Base64.encodeToString(encryptedBytes, Base64.NO_WRAP);
    }

    private SecretKey getOrCreateSecretKey() throws Exception {
        KeyStore keyStore = KeyStore.getInstance(KEYSTORE_PROVIDER);

        keyStore.load(null);

        SecretKey existingKey = (SecretKey) keyStore.getKey(KEY_ALIAS, null);

        if (existingKey != null) {
            return existingKey;
        }

        KeyGenerator keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, KEYSTORE_PROVIDER);

        keyGenerator.init(new KeyGenParameterSpec.Builder(
            KEY_ALIAS,
            KeyProperties.PURPOSE_DECRYPT | KeyProperties.PURPOSE_ENCRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setRandomizedEncryptionRequired(true)
                .build());

        return keyGenerator.generateKey();
    }
}
