BrowserPolicy.framing.allowAll();

BrowserPolicy.content.allowSameOriginForAll();
BrowserPolicy.content.allowDataUrlForAll("http://localhost:3200");
BrowserPolicy.content.allowOriginForAll("http://localhost:3200");

//BrowserPolicy.content.allowDataUrlForAll("http://insights-testrunner.insights.com/");
//BrowserPolicy.content.allowOriginForAll("http://insights-testrunner.insights.com/");
