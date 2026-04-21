import React, { useState } from 'react';
import { Rocket, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create a Meta Developer App',
    content: (
      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
        <p>Go to <a href="https://developers.facebook.com" target="_blank" rel="noreferrer" className="text-facebook-blue underline">developers.facebook.com</a> and click <strong>My Apps → Create App</strong>.</p>
        <p>Select a Use Case (e.g., <em>Build connected experiences</em>), enter your app name, and submit.</p>
        <p>Once created, your <strong>App ID</strong> and <strong>App Secret</strong> will be on the dashboard.</p>
      </div>
    )
  },
  {
    number: '02',
    title: 'Obtain a User Access Token',
    content: (
      <div className="space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">Use the Graph API Explorer tool to generate a user token and test permissions quickly.</p>
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
          {`https://www.facebook.com/dialog/oauth?
  client_id={app-id}
  &redirect_uri=YOUR_REDIRECT_URI
  &scope=public_profile,email`}
        </div>
      </div>
    )
  },
  {
    number: '03',
    title: 'Make Your First API Call',
    content: (
      <div className="space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">With your access token, make a request to the Graph API:</p>
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
          curl -X GET "https://graph.facebook.com/v25.0/me?fields=id,name&access_token=YOUR_TOKEN"
        </div>
        <div className="bg-gray-800 rounded-xl p-4 font-mono text-xs text-green-400 overflow-x-auto">
          {`{
  "id": "10001234567890",
  "name": "John Doe"
}`}
        </div>
      </div>
    )
  },
  {
    number: '04',
    title: 'Submit for App Review',
    content: (
      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
        <p>Most advanced permissions require App Review by Meta. To request access:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Go to <strong>App Review → Permissions and Features</strong></li>
          <li>Request the needed permission and provide a screencast</li>
          <li>Submit your use case for Meta review (3–5 business days)</li>
        </ul>
      </div>
    )
  },
];

const GetStartedPage = () => {
  const [openStep, setOpenStep] = useState(0);

  return (
    <div className="w-full pb-16 space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3 mb-2">
          <Rocket className="text-indigo-500" size={28} />
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Get Started</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Follow these steps to start building with the Facebook Graph API.</p>
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-2xl p-6">
        <h2 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Prerequisites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['A Facebook account', 'A verified business account', 'Developer tools (cURL or Postman)'].map((req, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-300">
              <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
              {req}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-dark-border">
          {steps.map((step, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenStep(openStep === i ? -1 : i)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition"
              >
                <span className="font-mono text-xs font-bold text-facebook-blue bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">{step.number}</span>
                <span className="font-semibold dark:text-white flex-1">{step.title}</span>
                {openStep === i ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
              </button>
              {openStep === i && (
                <div className="px-6 pb-6 pl-20">
                  {step.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
