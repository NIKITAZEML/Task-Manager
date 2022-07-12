const path = require('path')

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/ui/_index.scss";`
            }
        },
    },
}
