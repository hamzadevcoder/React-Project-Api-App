export const scopes = [
  {
    "id": "ads_management",
    "name": "ads_management",
    "category": "Ads",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the ads_management API.",
    "allowedUsage": [
      "Programmatically create campaigns and manage ads",
      "Fetch ad performance metrics",
      "Build ad management tools"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ad-account-id}/campaigns",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ad-account-id}/campaigns?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "238431",
          "name": "Summer Sale 2024",
          "status": "ACTIVE",
          "daily_budget": 5000
        }
      ]
    },
    "dashboardType": "ads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#ads_management"
  },
  {
    "id": "ads_read",
    "name": "ads_read",
    "category": "Ads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the ads_read API.",
    "allowedUsage": [
      "Programmatically create campaigns and manage ads",
      "Fetch ad performance metrics",
      "Build ad management tools"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ad-account-id}/campaigns",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ad-account-id}/campaigns?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "238431",
          "name": "Summer Sale 2024",
          "status": "ACTIVE",
          "daily_budget": 5000
        }
      ]
    },
    "dashboardType": "ads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#ads_read"
  },
  {
    "id": "attribution_read",
    "name": "attribution_read",
    "category": "Ads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the attribution_read API.",
    "allowedUsage": [
      "Programmatically create campaigns and manage ads",
      "Fetch ad performance metrics",
      "Build ad management tools"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ad-account-id}/campaigns",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ad-account-id}/campaigns?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "238431",
          "name": "Summer Sale 2024",
          "status": "ACTIVE",
          "daily_budget": 5000
        }
      ]
    },
    "dashboardType": "ads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#attribution_read"
  },
  {
    "id": "business_management",
    "name": "business_management",
    "category": "Business",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the business_management API.",
    "allowedUsage": [
      "Enable features related to business management",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#business_management"
  },
  {
    "id": "catalog_management",
    "name": "catalog_management",
    "category": "Catalog / Commerce",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the catalog_management API.",
    "allowedUsage": [
      "Enable features related to catalog management",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{catalog-id}/orders",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{catalog-id}/orders?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "order_123",
          "buyer_details": {
            "name": "Alice"
          },
          "order_status": "SHIPPED"
        }
      ]
    },
    "dashboardType": "commerce",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#catalog_management"
  },
  {
    "id": "commerce_account_manage_orders",
    "name": "commerce_account_manage_orders",
    "category": "Catalog / Commerce",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the commerce_account_manage_orders API.",
    "allowedUsage": [
      "Enable features related to commerce account manage orders",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{catalog-id}/orders",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{catalog-id}/orders?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "order_123",
          "buyer_details": {
            "name": "Alice"
          },
          "order_status": "SHIPPED"
        }
      ]
    },
    "dashboardType": "commerce",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#commerce_account_manage_orders"
  },
  {
    "id": "commerce_account_read_orders",
    "name": "commerce_account_read_orders",
    "category": "Catalog / Commerce",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the commerce_account_read_orders API.",
    "allowedUsage": [
      "Enable features related to commerce account read orders",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{catalog-id}/orders",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{catalog-id}/orders?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "order_123",
          "buyer_details": {
            "name": "Alice"
          },
          "order_status": "SHIPPED"
        }
      ]
    },
    "dashboardType": "commerce",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#commerce_account_read_orders"
  },
  {
    "id": "commerce_account_read_reports",
    "name": "commerce_account_read_reports",
    "category": "Catalog / Commerce",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the commerce_account_read_reports API.",
    "allowedUsage": [
      "Enable features related to commerce account read reports",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{catalog-id}/orders",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{catalog-id}/orders?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "order_123",
          "buyer_details": {
            "name": "Alice"
          },
          "order_status": "SHIPPED"
        }
      ]
    },
    "dashboardType": "commerce",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#commerce_account_read_reports"
  },
  {
    "id": "commerce_account_read_settings",
    "name": "commerce_account_read_settings",
    "category": "Catalog / Commerce",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the commerce_account_read_settings API.",
    "allowedUsage": [
      "Enable features related to commerce account read settings",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{catalog-id}/orders",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{catalog-id}/orders?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "order_123",
          "buyer_details": {
            "name": "Alice"
          },
          "order_status": "SHIPPED"
        }
      ]
    },
    "dashboardType": "commerce",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#commerce_account_read_settings"
  },
  {
    "id": "commerce_manage_accounts",
    "name": "commerce_manage_accounts",
    "category": "Catalog / Commerce",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the commerce_manage_accounts API.",
    "allowedUsage": [
      "Enable features related to commerce manage accounts",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{catalog-id}/orders",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{catalog-id}/orders?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "order_123",
          "buyer_details": {
            "name": "Alice"
          },
          "order_status": "SHIPPED"
        }
      ]
    },
    "dashboardType": "commerce",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#commerce_manage_accounts"
  },
  {
    "id": "email",
    "name": "email",
    "category": "Email",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the email API.",
    "allowedUsage": [
      "Enable features related to email",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#email"
  },
  {
    "id": "facebook_branded_content_ads_brand",
    "name": "facebook_branded_content_ads_brand",
    "category": "Facebook Content",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the facebook_branded_content_ads_brand API.",
    "allowedUsage": [
      "Enable features related to facebook branded content ads brand",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#facebook_branded_content_ads_brand"
  },
  {
    "id": "facebook_creator_marketplace_discovery",
    "name": "facebook_creator_marketplace_discovery",
    "category": "Facebook Content",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the facebook_creator_marketplace_discovery API.",
    "allowedUsage": [
      "Enable features related to facebook creator marketplace discovery",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#facebook_creator_marketplace_discovery"
  },
  {
    "id": "gaming_user_locale",
    "name": "gaming_user_locale",
    "category": "Gaming",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the gaming_user_locale API.",
    "allowedUsage": [
      "Enable features related to gaming user locale",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "gaming",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#gaming_user_locale"
  },
  {
    "id": "instagram_basic",
    "name": "instagram_basic",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_basic API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_basic"
  },
  {
    "id": "instagram_branded_content_ads_brand",
    "name": "instagram_branded_content_ads_brand",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_branded_content_ads_brand API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_branded_content_ads_brand"
  },
  {
    "id": "instagram_branded_content_brand",
    "name": "instagram_branded_content_brand",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_branded_content_brand API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_branded_content_brand"
  },
  {
    "id": "instagram_branded_content_creator",
    "name": "instagram_branded_content_creator",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_branded_content_creator API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_branded_content_creator"
  },
  {
    "id": "instagram_business_basic",
    "name": "instagram_business_basic",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_business_basic API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_business_basic"
  },
  {
    "id": "instagram_business_content_publish",
    "name": "instagram_business_content_publish",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_business_content_publish API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_business_content_publish"
  },
  {
    "id": "instagram_business_manage_comments",
    "name": "instagram_business_manage_comments",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_business_manage_comments API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_business_manage_comments"
  },
  {
    "id": "instagram_business_manage_messages",
    "name": "instagram_business_manage_messages",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_business_manage_messages API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_business_manage_messages"
  },
  {
    "id": "instagram_content_publish",
    "name": "instagram_content_publish",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_content_publish API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_content_publish"
  },
  {
    "id": "instagram_creator_marketplace_discovery",
    "name": "instagram_creator_marketplace_discovery",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_creator_marketplace_discovery API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_creator_marketplace_discovery"
  },
  {
    "id": "instagram_creator_marketplace_messaging",
    "name": "instagram_creator_marketplace_messaging",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_creator_marketplace_messaging API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_creator_marketplace_messaging"
  },
  {
    "id": "instagram_manage_comments",
    "name": "instagram_manage_comments",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_manage_comments API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_manage_comments"
  },
  {
    "id": "instagram_manage_contents",
    "name": "instagram_manage_contents",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_manage_contents API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_manage_contents"
  },
  {
    "id": "instagram_manage_engagement",
    "name": "instagram_manage_engagement",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_manage_engagement API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_manage_engagement"
  },
  {
    "id": "instagram_manage_events",
    "name": "instagram_manage_events",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_manage_events API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_manage_events"
  },
  {
    "id": "instagram_manage_insights",
    "name": "instagram_manage_insights",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_manage_insights API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_manage_insights"
  },
  {
    "id": "instagram_manage_messages",
    "name": "instagram_manage_messages",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_manage_messages API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "messaging",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_manage_messages"
  },
  {
    "id": "instagram_manage_upcoming_events",
    "name": "instagram_manage_upcoming_events",
    "category": "Instagram",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the instagram_manage_upcoming_events API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_manage_upcoming_events"
  },
  {
    "id": "instagram_shopping_tag_products",
    "name": "instagram_shopping_tag_products",
    "category": "Instagram",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the instagram_shopping_tag_products API.",
    "allowedUsage": [
      "Read an Instagram user's profile and media",
      "Publish content to Instagram",
      "Reply to comments and messages"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{ig-user-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{ig-user-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "178414",
      "username": "mock_brand",
      "media_count": 42
    },
    "dashboardType": "instagram",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#instagram_shopping_tag_products"
  },
  {
    "id": "leads_retrieval",
    "name": "leads_retrieval",
    "category": "Leads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the leads_retrieval API.",
    "allowedUsage": [
      "Enable features related to leads retrieval",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "leads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#leads_retrieval"
  },
  {
    "id": "manage_app_solutions",
    "name": "manage_app_solutions",
    "category": "Manage",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the manage_app_solutions API.",
    "allowedUsage": [
      "Enable features related to manage app solutions",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#manage_app_solutions"
  },
  {
    "id": "manage_fundraisers",
    "name": "manage_fundraisers",
    "category": "Manage",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the manage_fundraisers API.",
    "allowedUsage": [
      "Enable features related to manage fundraisers",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#manage_fundraisers"
  },
  {
    "id": "marketing_messages_messenger",
    "name": "marketing_messages_messenger",
    "category": "Manage",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the marketing_messages_messenger API.",
    "allowedUsage": [
      "Enable features related to marketing messages messenger",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#marketing_messages_messenger"
  },
  {
    "id": "pages_events",
    "name": "pages_events",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_events API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_events"
  },
  {
    "id": "pages_manage_ads",
    "name": "pages_manage_ads",
    "category": "Pages",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the pages_manage_ads API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_manage_ads"
  },
  {
    "id": "pages_manage_cta",
    "name": "pages_manage_cta",
    "category": "Pages",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the pages_manage_cta API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_manage_cta"
  },
  {
    "id": "pages_manage_engagement",
    "name": "pages_manage_engagement",
    "category": "Pages",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the pages_manage_engagement API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_manage_engagement"
  },
  {
    "id": "pages_manage_instant_articles",
    "name": "pages_manage_instant_articles",
    "category": "Pages",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the pages_manage_instant_articles API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_manage_instant_articles"
  },
  {
    "id": "pages_manage_metadata",
    "name": "pages_manage_metadata",
    "category": "Pages",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the pages_manage_metadata API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_manage_metadata"
  },
  {
    "id": "pages_manage_posts",
    "name": "pages_manage_posts",
    "category": "Pages",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the pages_manage_posts API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_manage_posts"
  },
  {
    "id": "pages_messaging",
    "name": "pages_messaging",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_messaging API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "messaging",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_messaging"
  },
  {
    "id": "pages_read_engagement",
    "name": "pages_read_engagement",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_read_engagement API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_read_engagement"
  },
  {
    "id": "pages_read_user_content",
    "name": "pages_read_user_content",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_read_user_content API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_read_user_content"
  },
  {
    "id": "pages_show_list",
    "name": "pages_show_list",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_show_list API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_show_list"
  },
  {
    "id": "pages_user_gender",
    "name": "pages_user_gender",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_user_gender API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_user_gender"
  },
  {
    "id": "pages_user_locale",
    "name": "pages_user_locale",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_user_locale API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_user_locale"
  },
  {
    "id": "pages_user_timezone",
    "name": "pages_user_timezone",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_user_timezone API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_user_timezone"
  },
  {
    "id": "pages_utility_messaging",
    "name": "pages_utility_messaging",
    "category": "Pages",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the pages_utility_messaging API.",
    "allowedUsage": [
      "Read page content and posts",
      "Manage page settings and webhooks",
      "Publish as the Page"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{page-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{page-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "12345",
      "name": "Mock Page",
      "followers_count": 10500
    },
    "dashboardType": "pages",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#pages_utility_messaging"
  },
  {
    "id": "public_profile",
    "name": "public_profile",
    "category": "Public",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the public_profile API.",
    "allowedUsage": [
      "Enable features related to public profile",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#public_profile"
  },
  {
    "id": "publish_video",
    "name": "publish_video",
    "category": "Public",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the publish_video API.",
    "allowedUsage": [
      "Enable features related to publish video",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "generic",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#publish_video"
  },
  {
    "id": "read_audience_network_insights",
    "name": "read_audience_network_insights",
    "category": "Read",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the read_audience_network_insights API.",
    "allowedUsage": [
      "Enable features related to read audience network insights",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "insights",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#read_audience_network_insights"
  },
  {
    "id": "read_insights",
    "name": "read_insights",
    "category": "Read",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the read_insights API.",
    "allowedUsage": [
      "Enable features related to read insights",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "/v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "mock_123",
      "status": "success"
    },
    "dashboardType": "insights",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#read_insights"
  },
  {
    "id": "threads_basic",
    "name": "threads_basic",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_basic API.",
    "allowedUsage": [
      "Enable features related to threads basic",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_basic"
  },
  {
    "id": "threads_business_basic",
    "name": "threads_business_basic",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_business_basic API.",
    "allowedUsage": [
      "Enable features related to threads business basic",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_business_basic"
  },
  {
    "id": "threads_content_publish",
    "name": "threads_content_publish",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_content_publish API.",
    "allowedUsage": [
      "Enable features related to threads content publish",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_content_publish"
  },
  {
    "id": "threads_delete",
    "name": "threads_delete",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_delete API.",
    "allowedUsage": [
      "Enable features related to threads delete",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_delete"
  },
  {
    "id": "threads_keyword_search",
    "name": "threads_keyword_search",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_keyword_search API.",
    "allowedUsage": [
      "Enable features related to threads keyword search",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_keyword_search"
  },
  {
    "id": "threads_location_tagging",
    "name": "threads_location_tagging",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_location_tagging API.",
    "allowedUsage": [
      "Enable features related to threads location tagging",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_location_tagging"
  },
  {
    "id": "threads_manage_insights",
    "name": "threads_manage_insights",
    "category": "Threads",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the threads_manage_insights API.",
    "allowedUsage": [
      "Enable features related to threads manage insights",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_manage_insights"
  },
  {
    "id": "threads_manage_mentions",
    "name": "threads_manage_mentions",
    "category": "Threads",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the threads_manage_mentions API.",
    "allowedUsage": [
      "Enable features related to threads manage mentions",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_manage_mentions"
  },
  {
    "id": "threads_manage_replies",
    "name": "threads_manage_replies",
    "category": "Threads",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the threads_manage_replies API.",
    "allowedUsage": [
      "Enable features related to threads manage replies",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_manage_replies"
  },
  {
    "id": "threads_profile_discovery",
    "name": "threads_profile_discovery",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_profile_discovery API.",
    "allowedUsage": [
      "Enable features related to threads profile discovery",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_profile_discovery"
  },
  {
    "id": "threads_read_replies",
    "name": "threads_read_replies",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_read_replies API.",
    "allowedUsage": [
      "Enable features related to threads read replies",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_read_replies"
  },
  {
    "id": "threads_share_to_instagram",
    "name": "threads_share_to_instagram",
    "category": "Threads",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the threads_share_to_instagram API.",
    "allowedUsage": [
      "Enable features related to threads share to instagram",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{threads-user-id}/threads",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{threads-user-id}/threads?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "th_123",
          "text": "Hello threads!",
          "like_count": 55
        }
      ]
    },
    "dashboardType": "threads",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#threads_share_to_instagram"
  },
  {
    "id": "user_age_range",
    "name": "user_age_range",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_age_range API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_age_range"
  },
  {
    "id": "user_birthday",
    "name": "user_birthday",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_birthday API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_birthday"
  },
  {
    "id": "user_friends",
    "name": "user_friends",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_friends API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_friends"
  },
  {
    "id": "user_gender",
    "name": "user_gender",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_gender API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_gender"
  },
  {
    "id": "user_hometown",
    "name": "user_hometown",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_hometown API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_hometown"
  },
  {
    "id": "user_likes",
    "name": "user_likes",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_likes API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_likes"
  },
  {
    "id": "user_link",
    "name": "user_link",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_link API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_link"
  },
  {
    "id": "user_location",
    "name": "user_location",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_location API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_location"
  },
  {
    "id": "user_messenger_contact",
    "name": "user_messenger_contact",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_messenger_contact API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_messenger_contact"
  },
  {
    "id": "user_photos",
    "name": "user_photos",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_photos API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_photos"
  },
  {
    "id": "user_posts",
    "name": "user_posts",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_posts API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_posts"
  },
  {
    "id": "user_videos",
    "name": "user_videos",
    "category": "User",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the user_videos API.",
    "allowedUsage": [
      "Read user's basic demographic data",
      "Read user's social graph",
      "Personalize user experience"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/me",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/me?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "id": "101010",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "dashboardType": "user",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#user_videos"
  },
  {
    "id": "whatsapp_business_manage_events",
    "name": "whatsapp_business_manage_events",
    "category": "WhatsApp",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the whatsapp_business_manage_events API.",
    "allowedUsage": [
      "Enable features related to whatsapp business manage events",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{waba-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{waba-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "waba_123",
          "name": "Business Info",
          "message_limit": "UNLIMITED"
        }
      ]
    },
    "dashboardType": "whatsapp",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#whatsapp_business_manage_events"
  },
  {
    "id": "whatsapp_business_management",
    "name": "whatsapp_business_management",
    "category": "WhatsApp",
    "accessLevel": "Advanced",
    "description": "Allows your app to interact with the whatsapp_business_management API.",
    "allowedUsage": [
      "Enable features related to whatsapp business management",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{waba-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{waba-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "waba_123",
          "name": "Business Info",
          "message_limit": "UNLIMITED"
        }
      ]
    },
    "dashboardType": "whatsapp",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#whatsapp_business_management"
  },
  {
    "id": "whatsapp_business_messaging",
    "name": "whatsapp_business_messaging",
    "category": "WhatsApp",
    "accessLevel": "Standard",
    "description": "Allows your app to interact with the whatsapp_business_messaging API.",
    "allowedUsage": [
      "Enable features related to whatsapp business messaging",
      "Read necessary data metrics",
      "Manage related business assets"
    ],
    "dependencies": [
      "public_profile"
    ],
    "endpoint": "GET /v25.0/{waba-id}",
    "curlExample": "curl -X GET \"https://graph.facebook.com/v25.0/{waba-id}?access_token=YOUR_TOKEN\"",
    "exampleResponse": {
      "data": [
        {
          "id": "waba_123",
          "name": "Business Info",
          "message_limit": "UNLIMITED"
        }
      ]
    },
    "dashboardType": "whatsapp",
    "metaDocsUrl": "https://developers.facebook.com/docs/permissions#whatsapp_business_messaging"
  }
];
