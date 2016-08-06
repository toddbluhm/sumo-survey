import { client_configuration } from 'universal-webpack';
import settings from './universal-webpack-settings';
import configuration from './webpack.config';
import { default as webpack } from 'webpack';

// Add in custom hot loading stuff for client only
configuration.entry.unshift(`webpack-hot-middleware/client?path=http://${process.env.HOST}:${process.env.WEBPACK_PORT}/__webpack_hmr&timeout=20000`);
configuration.entry.unshift('webpack/hot/only-dev-server');
configuration.entry.unshift('react-hot-loader/patch');

configuration.module.loaders[0].loaders.unshift('react-hot-loader/webpack');

configuration.plugins.unshift(new webpack.HotModuleReplacementPlugin());

export default client_configuration(configuration, settings);
