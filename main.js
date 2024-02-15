// 유저가 값을 입력한다.
// + 버튼 클릭하면, 할일이 추가된다.
// 유저가 삭제 버튼을 누르면 할일이 삭제된다.
// 체크버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1. check 버튼을 클릭하는 순간, false -> true로 바꿔줌
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로 
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중인 것만 나타난다.
// 전체 탭을 누르면, 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tap div") // 처음 써보는 함수
let underLine = document.getElementById("under-line");
let taskList = []
let mode = 'all'; //mode를 전역변수로 전환!
let filterList = []

addButton.addEventListener("click", addTask)
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addTask(event);
    }
});

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    })
}

console.log(tabs)

function addTask() {
    // 할일 입력해주세요.
    let taskValue = taskInput.value;
    if (taskValue == "") return alert ("오늘은 뭐할까?")
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        // 끝났는지 안 끝났는지 확인해주는
        isComplete:false
    }
    // 객체가 왜 필요한가? 추가정보를 위해서, 추가 정보를 필요할 때, 필요한 관련 있는 정보를 묶어주는거, 정보를 통해 정의하는 방법.
    taskList.push(task)
    taskInput.value = "";
    render();
}
// todolist task를 만들어주는 기능
function render() {
    // 1. 내가 선택한 탭에 따라서  : mode 변수
    let list = []
    if (mode === 'all') {
        // all = taskList
        list = taskList;
    } else if (mode == "ongoing" || mode == "done") {
        // ongoing, done filterList
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다.
    // all taskList
    // ongoing, done에서 filterList
    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML+= `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick ="toggleComplete('${list[i].id}')">체크</button> 
                <button onclick ="deleteTask('${list[i].id}')">삭제</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick ="toggleComplete('${list[i].id}')">체크</button> 
                <button onclick ="deleteTask('${list[i].id}')">삭제</button>
            </div>
        </div>`;
        }

    }
// onclick event 기억. onclick = "함수"

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    //내가 어떤 아이템을 선택했어요를 알려줘야 한다.
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; //true와 false를 왔다갔다할 수 있는 기능, 현재 갖고 있는 값에 반대
            break
        }
        
        
    }
    render()
    console.log(taskList);
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].id == id) {
            taskList.splice(i, 1)
            break;
        }
    }
    render()
}
// 어떤 것을 업데이트 했다면, UI도 같이 업데이트를 해줘야 한다.

// 누구를 클릭했는지에 대한 이벤트
// 무엇을 클릭 했는지에 대한 기능 구현
// 우리에게 3가지 케이스가 존재한다.

function filter(event) {
    // event.target.id가 너무 길어서 변수로 만들어줌.
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =
        event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    } 
    filterList = []

    if (mode === "all") {
        // 전체 리스트를 보여준다.
        render();
    } else if (mode === "ongoing") {
        // 진행중인 아이템을 보여준다.
        // task.isComplete = false
        for (let i = 0; i < taskList.length; i++){
            if (taskList[i].isComplete === false) {
                filterList.push(taskList[i])
            }
        }
        render();
        console.log("진행중", filterList)
    } else if (mode === "done") {
        // 끝나는 케이스
        // task.isComplete = true
        for (let i = 0; i < taskList.length; i++){
            if (taskList[i].isComplete === true) {
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9); //
}
