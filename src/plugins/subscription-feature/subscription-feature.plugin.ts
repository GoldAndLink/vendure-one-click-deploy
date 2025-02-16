import * as path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { SUBSCRIPTION_FEATURE_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: SUBSCRIPTION_FEATURE_PLUGIN_OPTIONS, useFactory: () => SubscriptionFeaturePlugin.options }],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        return config;
    },
    compatibility: '^3.0.0',
})
export class SubscriptionFeaturePlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<SubscriptionFeaturePlugin> {
        this.options = options;
        return SubscriptionFeaturePlugin;
    }

    static ui: AdminUiExtension = {
        id: 'subscription-feature-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'subscription-feature', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
}
