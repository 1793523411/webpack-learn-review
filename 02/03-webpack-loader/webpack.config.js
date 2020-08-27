/** @type {import('webpack').Configuration} */

module.exports = {
    // entry:'./src/main.css',
    entry:'./src/main.js',
    output:{
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:'css-loader'
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}