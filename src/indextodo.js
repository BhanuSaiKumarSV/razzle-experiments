var tagInput=document.getElementById("tag-name");
var addTagButton=document.getElementById("add-tag");
var tagList=document.getElementById("tag-list");

var createNewTag=function(tagvalue){
	var listItem=document.createElement("li");
	var tagsCount=tagList.childElementCount
	console.log('tags count ', tagsCount)
	listItem.id="tag-"+(tagsCount+1);
	var listLabel=document.createElement("label");
	var individualTagCloseButton=document.createElement("button");
	listLabel.innerText=tagvalue;
	individualTagCloseButton.class="tagButton";
	individualTagCloseButton.id="tagclose-"+(tagsCount+1);
	individualTagCloseButton.innerText="x";
	individualTagCloseButton.onclick=removeTag;
	listItem.appendChild(listLabel);
	listItem.appendChild(individualTagCloseButton);
	console.log('appendChild ', listItem)
	return listItem
}

var addTag=function(){
	console.log('Add Tag');
	var listItem=createNewTag(tagInput.value);
	tagInput.value="";
	tagList.appendChild(listItem);
}

var removeTag=function(index){
	console.log('index ', index.path[1].id)
	var element = document.getElementById(index.path[1].id);
	element.parentNode.removeChild(element);
    element[index].removeChild(element[index]);
}
addTagButton.onclick=addTag;

var taskInput=document.getElementById("task-name");
var statusInput=document.getElementById("status-type");
var addTaskButton=document.getElementById("add-task");
var todoTable=document.getElementById('todo-table');


var createNewTag=function(tagvalue){
	var listItem=document.createElement("li");
	var tagsCount=tagList.childElementCount
	console.log('tags count ', tagsCount)
	listItem.id="tag-"+(tagsCount+1);
	var listLabel=document.createElement("label");
	var individualTagCloseButton=document.createElement("button");
	listLabel.innerText=tagvalue;
	individualTagCloseButton.class="tagButton";
	individualTagCloseButton.id="tagclose-"+(tagsCount+1);
	individualTagCloseButton.innerText="x";
	individualTagCloseButton.onclick=removeTag;
	listItem.appendChild(listLabel);
	listItem.appendChild(individualTagCloseButton);
	console.log('appendChild ', listItem)
	return listItem
}

var addTask=function(){
	console.log('Add Tag');
	var taskName=taskInput.value;
	var statusName=statusInput;
	var tableBody=todoTable.children
	console.log('tablebody ', tableBody[0].childElementCount)
	var todosCount=tableBody[0].childElementCount
	console.log('todoElement Table ', todoTable)
	console.log('todos count ',taskName, statusName, todosCount)
	var todoItem=document.createElement("tr");
	todoItem.id="todo-"+(todosCount);
	var td1=document.createElement("td");
	td1.id="td-1";
	td1.align="center";
	var checkb=document.createElement("input");
	checkb.type="checkbox";
	checkb.id="todoItem-"+(todosCount);
	td1.appendChild(checkb)

	var td2=document.createElement("td");
	td1.id="td-2";
	td2.align="center";
	var taskLabel=document.createElement("label");
	taskLabel.id="todoItemName-"+(todosCount);
	taskLabel.innerText=taskName;
	td2.appendChild(taskLabel);

	var td3=document.createElement("td");
	td3.id="td-3";
	td3.class="todoListTags";
	td3.align="center";
	var tasksUL=document.createElement("ul");
	tasksUL.align="center";
	tasksUL.class="todoTagsList";
	tasksUL.id="todoItemTags-"+(todosCount);

	console.log("uL ", tagList.children);
	for(let i=0;i<tagList.children.length;i++) {
		var liItem = tagList.children[i];
		liItem.id="";
		tasksUL.appendChild(liItem.children[0]);
	}
	td3.appendChild(tasksUL);

	var td4=document.createElement("td");
	td4.id="td-4";
	td4.align="center";
	var statusLabel=document.createElement("label");
	statusLabel.id="todoItemStatus-"+(todosCount);
	statusLabel.innerText="Completed";
	td4.appendChild(statusLabel);

	var td5=document.createElement("td");
	td5.id="td-5";
	td5.align="center";
	var editButton=document.createElement("button");
	editButton.id="edittr-"+(todosCount);
	editButton.class="todoEdit";
	editButton.innerText="Edit";
	var deleteButton=document.createElement("button");
	deleteButton.id="deletetr-"+(todosCount);
	deleteButton.class="todoDelete";
	deleteButton.innerText="Delete";

	td5.appendChild(editButton);
	td5.appendChild(deleteButton);

	todoItem.appendChild(td1);
	todoItem.appendChild(td2);
	todoItem.appendChild(td3);
	todoItem.appendChild(td4);
	todoItem.appendChild(td5);
	tableBody[0].appendChild(todoItem);
}

addTaskButton.onclick=addTask;

var removeTask=function(index){
	console.log('index ', index.path[1].id)
	var element = document.getElementById(index.path[1].id);
	element.parentNode.removeChild(element);
    element[index].removeChild(element[index]);
}
