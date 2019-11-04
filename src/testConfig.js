// @flow

export const isDebugging = () => {
  const debuggingMode = {
    config: {
      headless: false,
      slowMo: 80,
      args: [`--window-size=1920,1080`],
    },
  };
  return process.env.NODE_ENV === 'debug' ? debuggingMode : null;
};
