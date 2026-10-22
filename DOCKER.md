# Library frontend deployment

The library runtime is defined by the Dockerfile and Compose project in
`andrewLarsson/larsson-library`. This repository is its separate `ui` build context,
selected by an exact Git revision. No custom image registry is required.

The API URL is `/api`, so one frontend build works behind the production domain
and the private preview hostname without calling the old server. Locally used
HTML5 Boilerplate assets and Material Design Lite 1.0.6 are vendored with their
original licenses. The former Google Storage Material Design URLs return 403;
the same CSS theme and JavaScript now load from this application. Other
versioned third-party CDN scripts are retained for functional migration; AngularJS
and other legacy frontend dependencies need a separate modernization effort.
