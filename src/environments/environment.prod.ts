/**
 * 因为生产环境下，不确定代码要放在什么环境下使用，所以在请求本地文件的时候请使用相对路径， 远程请求的时候请在链接前
 * 加上用以区分的字符 ，
 * @type {{SERVER_URL: string; production: boolean; hmr: boolean; LOCAL_URL: string}}
 */
export const environment = {
    // LOCAL_URL: 'http://101.201.68.143/blog/',
    SERVER_URL: `blog/`,
    // TEST_SERVER_URL: `wordentry/`,
    SERVER_PREFIX: 'api/',
    production: true,
    hmr: false
};
