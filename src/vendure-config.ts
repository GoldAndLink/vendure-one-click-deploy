import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
    LanguageCode,
    DefaultMoneyStrategy,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin, configureS3AssetStorage } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import 'dotenv/config';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';

export class FiveDecimalPlacesMoneyStrategy extends DefaultMoneyStrategy {
    readonly precision = 5;
}

export const config: VendureConfig = {
    apiOptions: {
        port: +(process.env.PORT || 3000),
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiPlayground: {
                settings: { 'request.credentials': 'include' } as any,
            },
            adminApiDebug: true,
            shopApiPlayground: {
                settings: { 'request.credentials': 'include' } as any,
            },
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
            secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: {
        type: 'postgres',
        // See the README.md "Migrations" section for an explanation of
        // the `synchronize` and `migrations` options.
        synchronize: false,
        migrations: [path.join(__dirname, './migrations/*.+(ts|js)')],
        logging: false,
        database: process.env.DB_NAME,
        schema: process.env.DB_SCHEMA,
        host: process.env.DB_HOST,
        url: process.env.DB_URL,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        ssl: process.env.DB_CA_CERT ? {
            ca: process.env.DB_CA_CERT,
        } : undefined,
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {
        ProductVariant: [{
            name: 'priceDetails',
            type: 'localeString',
            label: [
                { languageCode: LanguageCode.en, value: 'Price per kilo' },
                { languageCode: LanguageCode.fr, value: 'Prix au kilo' },
            ],
        }, {
            name: 'packagingDetails',
            type: 'localeString',
            label: [
                { languageCode: LanguageCode.en, value: 'Packaging Details' },
                { languageCode: LanguageCode.fr, value: 'Détails du conditionnement' },
            ],
        }, {
            name: 'origin',
            type: 'localeString',
            label: [
                { languageCode: LanguageCode.en, value: 'Origin' },
                { languageCode: LanguageCode.fr, value: 'Origine' },
            ],
            defaultValue: 'Martinique',
        }, {
            name: 'alternateName',
            type: 'localeString',
            label: [
                { languageCode: LanguageCode.en, value: 'Alternate Name' },
                { languageCode: LanguageCode.fr, value: 'Nom alternatif' },
            ],
        }, {
            name: 'isSoldByWeight',
            type: 'boolean',
            label: [
                { languageCode: LanguageCode.en, value: 'Is sold by weight?' },
                { languageCode: LanguageCode.fr, value: 'Vendu au poids?' },
            ],
            defaultValue: false,
        }],
        StockLevel: [{
            name: 'weightOnHand',
            type: 'float',
            label: [
                { languageCode: LanguageCode.en, value: 'Weight on hand' },
                { languageCode: LanguageCode.fr, value: 'Poids en stock' },
            ],
        }],
    },
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: process.env.ASSET_UPLOAD_DIR || path.join(__dirname, '../static/assets'),
            // If the MINIO_ENDPOINT environment variable is set, we'll use
            // Minio as the asset storage provider. Otherwise, we'll use the
            // default local provider.
            storageStrategyFactory: process.env.MINIO_ENDPOINT ? configureS3AssetStorage({
                bucket: 'vendure-assets',
                credentials: {
                    accessKeyId: process.env.MINIO_ACCESS_KEY,
                    secretAccessKey: process.env.MINIO_SECRET_KEY,
                },
                nativeS3Configuration: {
                    endpoint: process.env.MINIO_ENDPOINT,
                    forcePathStyle: true,
                    signatureVersion: 'v4',
                    // The `region` is required by the AWS SDK even when using MinIO,
                    // so we just use a dummy value here.
                    region: 'eu-west-1',
                },
            }) : undefined,
        }),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we are assuming a storefront running at http://localhost:8080.
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: 3002,
        }),
    ],
    entityOptions: {
        moneyStrategy: new FiveDecimalPlacesMoneyStrategy(),
    },
    orderOptions: {
        orderItemsLimit: 999999,
        orderLineItemsLimit: 999999,
    },
};
