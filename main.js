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
let taskList = []

addButton.addEventListener("click", addTask)

function addTask() {
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        // 끝났는지 안 끝났는지 확인해주는
        isComplete:false
    }
    // 객체가 왜 필요한가? 추가정보를 위해서, 추가 정보를 필요할 때, 필요한 관련 있는 정보를 묶어주는거, 정보를 통해 정의하는 방법.
    taskList.push(task)
    console.log(taskList)
    render();
}

function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
            resultHTML+= `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick ="toggleComplete('${taskList[i].id}')">체크</button> 
                <button onclick ="deleteTask('${taskList[i].id}')">삭제</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick ="toggleComplete('${taskList[i].id}')">체크</button> 
                <button onclick ="deleteTask('${taskList[i].id}')">삭제</button>
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

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9); //
}
