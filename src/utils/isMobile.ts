// const detectBrowser = () => {
//   let userAgent = navigator.userAgent;
//   let browserName;

//   if (userAgent.match(/chrome|chromium|crios/i)) {
//     browserName = 'Chrome';
//   } else if (userAgent.match(/firefox|fxios/i)) {
//     browserName = 'Firefox';
//   } else if (userAgent.match(/safari/i)) {
//     browserName = 'Safari';
//   } else if (userAgent.match(/opr\//i)) {
//     browserName = 'Opera';
//   } else if (userAgent.match(/edg/i)) {
//     browserName = 'Edge';
//   } else if (userAgent.match(/android/i)) {
//     browserName = 'Android';
//   } else if (userAgent.match(/iphone/i)) {
//     browserName = 'iPhone';
//   } else {
//     browserName = 'Unknown';
//   }

//   return browserName;
// };

export const isMobile = () => {
  // No attached device supports hover
  return window.matchMedia('(any-hover: none)').matches;
};
