const {
    createSession,
    closeSession,
    startWebDriver,
    stopWebDriver,
    client
  } = require('nightwatch-api');
  const excel2Json = require('node-excel-to-json');
  const path = require('path');

  async function getDataFromExcel() {
    return new Promise((resolve, reject) => {
        excel2Json(path.resolve(__dirname, './sample.xlsx'), {
            'convert_all_sheet': false,
            'return_type': 'Object',
            'sheetName': 'Sheet1'
        }, function(err, output) {
         if (err) {
             reject(err);
         }
         resolve(output);
        });
    })
  }
  
  async function setup(env = 'default') {
    await startWebDriver({ env });
    await createSession({ env });
  }
  
  async function shutdown() {
    await closeSession();
    await stopWebDriver();
  }
  
  async function run() {
    await client.url('https://www.baidu.com/');
    let title;
    await client.getTitle(t => (title = t));
    console.log(title);
    const result = await getDataFromExcel();
    console.log(result);
  }
  
  (async function() {
    try {
      await setup('chrome');
      await run();
    } catch (err) {
      console.log(err.stack);
    } finally {
      await shutdown();
    }
  })();