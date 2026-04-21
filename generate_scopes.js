const fs = require('fs');
const path = require('path');

const scopes_def = {
  "Ads": ["ads_management", "ads_read", "attribution_read"],
  "Business": ["business_management"],
  "Catalog / Commerce": ["catalog_management", "commerce_account_manage_orders", "commerce_account_read_orders", "commerce_account_read_reports", "commerce_account_read_settings", "commerce_manage_accounts"],
  "Email": ["email"],
  "Facebook Content": ["facebook_branded_content_ads_brand", "facebook_creator_marketplace_discovery"],
  "Gaming": ["gaming_user_locale"],
  "Instagram": ["instagram_basic", "instagram_branded_content_ads_brand", "instagram_branded_content_brand", "instagram_branded_content_creator", "instagram_business_basic", "instagram_business_content_publish", "instagram_business_manage_comments", "instagram_business_manage_messages", "instagram_content_publish", "instagram_creator_marketplace_discovery", "instagram_creator_marketplace_messaging", "instagram_manage_comments", "instagram_manage_contents", "instagram_manage_engagement", "instagram_manage_events", "instagram_manage_insights", "instagram_manage_messages", "instagram_manage_upcoming_events", "instagram_shopping_tag_products"],
  "Leads": ["leads_retrieval"],
  "Manage": ["manage_app_solutions", "manage_fundraisers", "marketing_messages_messenger"],
  "Pages": ["pages_events", "pages_manage_ads", "pages_manage_cta", "pages_manage_engagement", "pages_manage_instant_articles", "pages_manage_metadata", "pages_manage_posts", "pages_messaging", "pages_read_engagement", "pages_read_user_content", "pages_show_list", "pages_user_gender", "pages_user_locale", "pages_user_timezone", "pages_utility_messaging"],
  "Public": ["public_profile", "publish_video"],
  "Read": ["read_audience_network_insights", "read_insights"],
  "Threads": ["threads_basic", "threads_business_basic", "threads_content_publish", "threads_delete", "threads_keyword_search", "threads_location_tagging", "threads_manage_insights", "threads_manage_mentions", "threads_manage_replies", "threads_profile_discovery", "threads_read_replies", "threads_share_to_instagram"],
  "User": ["user_age_range", "user_birthday", "user_friends", "user_gender", "user_hometown", "user_likes", "user_link", "user_location", "user_messenger_contact", "user_photos", "user_posts", "user_videos"],
  "WhatsApp": ["whatsapp_business_manage_events", "whatsapp_business_management", "whatsapp_business_messaging"]
};

const dashboard_mapping = {
  "Ads": "ads",
  "Instagram": "instagram",
  "Pages": "pages",
  "User": "user",
  "Catalog / Commerce": "commerce",
  "WhatsApp": "whatsapp",
  "Threads": "threads",
  "Leads": "leads",
  "Gaming": "gaming",
  "Read": "insights"
};

function get_dashboard_type(category, name) {
  if (name === "pages_messaging" || name === "instagram_manage_messages") {
      return "messaging";
  }
  return dashboard_mapping[category] || "generic";
}

function get_allowed_usage(category, name) {
  if (category === "Ads") return ["Programmatically create campaigns and manage ads", "Fetch ad performance metrics", "Build ad management tools"];
  if (category === "Instagram") return ["Read an Instagram user's profile and media", "Publish content to Instagram", "Reply to comments and messages"];
  if (category === "Pages") return ["Read page content and posts", "Manage page settings and webhooks", "Publish as the Page"];
  if (category === "User") return ["Read user's basic demographic data", "Read user's social graph", "Personalize user experience"];
  return [`Enable features related to ${name.replace(/_/g, ' ')}`, "Read necessary data metrics", "Manage related business assets"];
}

function generate_scopes() {
  const scopes = [];
  
  for (const [category, names] of Object.entries(scopes_def)) {
      for (const name of names) {
          const d_type = get_dashboard_type(category, name);
          
          let example_resp = { data: [] };
          let endpoint = "/v25.0/me";
          
          if (d_type === "ads") {
              example_resp = { data: [{ id: "238431", name: "Summer Sale 2024", status: "ACTIVE", daily_budget: 5000 }] };
              endpoint = "GET /v25.0/{ad-account-id}/campaigns";
          } else if (d_type === "instagram") {
              example_resp = { id: "178414", username: "mock_brand", media_count: 42 };
              endpoint = "GET /v25.0/{ig-user-id}";
          } else if (d_type === "pages") {
              example_resp = { id: "12345", name: "Mock Page", followers_count: 10500 };
              endpoint = "GET /v25.0/{page-id}";
          } else if (d_type === "user") {
              example_resp = { id: "101010", name: "John Doe", email: "john@example.com" };
              endpoint = "GET /v25.0/me";
          } else if (d_type === "commerce") {
              example_resp = { data: [{ id: "order_123", buyer_details: { name: "Alice" }, order_status: "SHIPPED" }] };
              endpoint = "GET /v25.0/{catalog-id}/orders";
          } else if (d_type === "whatsapp") {
              example_resp = { data: [{ id: "waba_123", name: "Business Info", message_limit: "UNLIMITED" }] };
              endpoint = "GET /v25.0/{waba-id}";
          } else if (d_type === "threads") {
              example_resp = { data: [{ id: "th_123", text: "Hello threads!", like_count: 55 }] };
              endpoint = "GET /v25.0/{threads-user-id}/threads";
          } else {
              example_resp = { id: "mock_123", status: "success" };
          }

          const scope = {
              id: name,
              name: name,
              category: category,
              accessLevel: name.includes("manage") ? "Advanced" : "Standard",
              description: `Allows your app to interact with the ${name} API.`,
              allowedUsage: get_allowed_usage(category, name),
              dependencies: name !== "public_profile" ? ["public_profile"] : [],
              endpoint: endpoint,
              curlExample: `curl -X GET "https://graph.facebook.com${endpoint.split(" ").length > 1 ? endpoint.split(" ")[1] : endpoint}?access_token=YOUR_TOKEN"`,
              exampleResponse: example_resp,
              dashboardType: d_type,
              metaDocsUrl: `https://developers.facebook.com/docs/permissions#${name}`
          };
          scopes.push(scope);
      }
  }
  return scopes;
}

const dir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'scopes.js'), 'export const scopes = ' + JSON.stringify(generate_scopes(), null, 2) + ';\n');
