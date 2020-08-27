/** @type {import('webpack').Configuration} */

module.exports = {
    entry:'./src/main.js',
    output:{
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.md$/,
                use:[
                    'html-loader',
                    './markdown-loader.js'
                ]
            },
            
        ]
    }
}