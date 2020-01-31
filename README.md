# Timeblocker

**This app is still in development and is not suitable for use.**

Set tasks with specific start and end time. Based on a unique scheduling approach called **timeblocking**.

[A quick overview of timeblocking by Cal Newport.](https://www.calnewport.com/blog/2013/12/21/deep-habits-the-importance-of-planning-every-minute-of-your-work-day/)

# Installation
## Build instructions:
Clone the repository and navigate into its directory:

``` git clone https://github.com/tghgg/timeblocker.git && cd timeblocker ```

Install dependencies locally:

``` npm install --save-dev ``` 

Build with `electron-builder`:

``` npm run dist ```

The application should be in a new directory `dist` (Windows and Linux building is currently supported, MacOS build can be added easily in the package.json's build script. See `electron-builder` docs).

# License 
Licensed with the GPLv3 license.
