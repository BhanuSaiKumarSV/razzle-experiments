import * as expressStaticGzip from 'express-static-gzip'

import App from './App';
import React from 'react';
import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import stats from '../build/react-loadable.json';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(process.env.RAZZLE_PUBLIC_DIR, expressStaticGzip(process.env.RAZZLE_PUBLIC_DIR, {
    enableBrotli: true,
    orderPreference: ['gz', 'br'],
    serveStatic: {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000')
      }
    }
  }
 ))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const modules = [];
    const markup = renderToString(
      <Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Capture>,
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      const bundles = getBundles(stats, modules);
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));

      res.status(200).send(
        `<!doctype html>
<html lang="">
  <head>

  <title>Todo App</title>
    <!-- <link href='https://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'> -->
    <link rel="stylesheet" href="styles.css" type="text/css" media="screen" charset="utf-8">  

    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Welcome to Razzle</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${assets.client.css
      ? `<link rel="stylesheet" href="https://d2a60em2xsvm3v.cloudfront.net${assets.client.css}">`
      : ''}
  </head>
  <body>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>
  <div class="container">
  <h2>todo</h2>
  <hr />
  <div class='progressBar'>
    <div class='progressBarItem'><label>&nbsp;Pending Taks :&nbsp;</label><div id='pending-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Completed Taks :&nbsp;</label><div id='completed-task'> 0</div>&nbsp;</div>
    <div class='progressBarItem'><label>&nbsp;Progress :&nbsp;</label><div id='progress-perc'> 0</div> &nbsp;%&nbsp;</div>
  </div>
  <hr />
  <div class="todoManipulate">
    <label for="task-name">Task Name :&nbsp;</label><input id="task-name" type="text"><br/><br/>
    <label for="status-type">Status :&nbsp;</label>
      <select name="status" id="task-status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />
    <label for="tag-name">Tags :&nbsp;</label><input id="tag-name" type="text"><button id="add-tag">+</button>
    <ul class='addedTags' id="tag-list">
    </ul>
    <button class="saveButton" id="add-task">&nbsp;Save</button><br />
  </div>
  <hr />
  <div class='bulkManipulate'>
    <input type="checkbox" id='showpending'><label>Show Pending</label>&nbsp;
    <a href='' alt='Clear Completed' id='clear-completed'>x Clear Completed</a>
  </div>
  <br />
  <hr />
  <div class='todoListTable'>
    <table id='todo-table'>
      <tr>
        <th>Complete</td>
        <th>Name</td>
        <th>Tags</td>
        <th>Staus</td>
        <th>Actions</td>
      </tr>
      <tr id='todo-1'>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-1'></td>
        <td id='td-2' align='center'><lable id='todoItemName-1'>Task1</lable></td>
        <td class='todoListTags' id='td-3' align='center'><ul align='center' class='todoTagsList' id='todoItemTags-1'><li>Tag1</li><li>Tag2</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
      <tr id='todo-2 '>
        <td id='td-1' align='center'><input type="checkbox" id='todoItem-2'></td>
        <td id=td-2 align='center'><lable id='todoItemName-1'>Task2</lable></td>
        <td class='todoListTags' id=td-3 align='center'><ul id='todoItemTags-2'><li>Tag1</li></ul></td>
        <td id='td-4' align='center'><lable id='todoItemStatus-1'>Completed</lable></td>
        <td id='td-5' align='center'><button class='todoEdit' type="button">Edit</button><button class='todoDelete' type="button">Delete</button></td>
      </tr>
    </table>
    </div>
  <script type="text/javascript" src="indextodo.js"></script>


    <div id="root">${markup}</div>
    ${process.env.NODE_ENV === 'production'
      ? `<script src="https://d2a60em2xsvm3v.cloudfront.net${assets.client.js}"></script>`
      : `<script src="https://d2a60em2xsvm3v.cloudfront.net${assets.client.js}"></script>`}
    ${chunks.map(chunk => `<script src="https://d2a60em2xsvm3v.cloudfront.net/${chunk.file}"></script>`).join('\n')}
  </body>
</html>`,
      );
    }
  });

export default server;
