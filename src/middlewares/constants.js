exports. MIDDLEWARE = {
    VALIDATOR: {
        HEADER: {
            URL_LAST_PATH_REGEX: /(?<=[\d])\/[\w]+/,
            URL_PATH_WITHOUT_BASE: /(?<=api\/v\d)\/[\S]+/,
            TRAILING_SLASH_REGEX: /\/$/,
        },
        BODY: {
            MISSING_SCHEMA_MSG: 'Request validation skipped: no matching request schema',
        },
    },
};
