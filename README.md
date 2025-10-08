# gRPC-Web DevTools

A browser extension for inspecting gRPC-Web requests and responses.
Based on [SergioTx's fork](https://github.com/SergioTx/grpc-web-devtools) with a modernized build system and UI.

## Loading as a local extension

### Chrome
1. `npm run build`
2. Open `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `dist/chrome` directory

### Firefox
1. `npm run package`
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `grpcweb-devtools.firefox.zip` file.
