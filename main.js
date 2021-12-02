// 1) գրել list, որտեղ կլինեն կենդանիների անուններ, օրինակ՝ owl, salmon, tarantula։ Այդ կենդանիներին սեղմելուց list-ի
// տակը պետք է ավելանա այդ կենդանու տիպը, այսինքն սեղմենք owl-ին, բերի bird: Պետք է օգտագործել data-attribute-ներ



const list =[
    {
        name:'owl',
        type: 'bird' 
    }, 
    {
        name:'salmon', 
        type: 'fish'
    },
    {
        name: 'tarantula',
        type: 'insects'
    }
]

function renderItems(list) {
    return list.map(item =>{
        const {name, type} = item;
        return `<li data-type=${type}>${name}</li>`     
    }).join('')
}

document.body.innerHTML += `
    <ul id='wrapper'>
        ${renderItems(list)}
    </ul>
    <p></p>
`
const wrapper = document.getElementById('wrapper');
const type_text = wrapper.nextElementSibling;

wrapper.addEventListener('click', (e)=>{
    if(e.target.dataset.type) {
        type_text.innerText = e.target.dataset.type;
    }
})



// Task 2 օգտագործելով նախորդ խնդիրը ավելացնել 'hide all' button, որին սեղմելուց էջի վրա կնա միային այդ կոճակը, որի տեքստը
//կդառնա 'show all', և երկրորդ սեղմելուց բոլոր հետ կգան։



const toggleBtn = document.createElement('button');
document.body.appendChild(toggleBtn);
 
function toggleList() {
    wrapper.classList.toggle('hidden');
}
 
function btnContent() {
    toggleBtn.innerText = wrapper.classList.contains('hidden') ? 'Show All':'Hide All';
}
 
toggleBtn.addEventListener('click', ()=>{
    toggleList();
    btnContent();
})
 
window.addEventListener('load', ()=>btnContent());
 


// Task 3 օգտագործելով նախորդ խնդիրը ավելացնել երկու input և button։ Առաջին ինպուտում պետք է գրվի թիվ և կոճակին սեղմելուց
// երկրորդ ինպուտում այդ թվի քառակուսին պետք է ցույց տա։ Երկրորդ input-ի արժեքը պետք է հնարավոր չլինի փոխել


document.body.innerHTML += `
    <hr />
    <div>
        <input type="number" id="num_input">
        <input type="text" id="num_pow_input" disabled>
        <button id='pow_btn'>Pow</button>
    </div>
`;

const powBtn = document.getElementById('pow_btn');

powBtn.addEventListener('click', () =>{
    const powInput = document.getElementById('num_pow_input');
    const numInput = document.getElementById('num_input');
    powInput.value = numInput.value **2;
})


// Task 4 օգտագործելով նախորդ խնդիրը ավելացնել 4 div էլեմենտները, ամեն մեկի մեջ p թեգ և կամայական տեքստ և ամենաներքևում
// button։ Այդ կոճակին սեղմելուց պետք է ստուգվի այդ տեքստերի երկարությունը, եթե ինչ որ մեկը լինի 4 նիշից քիչ այդ
// input-ի կողքը կարմիր գույնի էռռոռ պետք է երևա և 3 վարկյան հետո անհետանա։



document.body.innerHTML += `
    <hr />
    <form id="task4">
        <div>
            <input type="text" />
        </div>
        <div>
            <input type="text" />
        </div>
        <div>
            <input type="text" />
        </div>
        <div>
            <input type="text" />
        </div>
        <button type='submit'>Check length</button>
    </form>
`;

const form = document.getElementById('task4');

form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll('input')]; //= Array.from()

    inputs.forEach((input, i) =>{
        if(input.value.length < 4) {
            input.parentElement.innerHTML += `<span class='error' ${i}>Error </span>`
        }
    })
    const timeout = setTimeout(()=>{
        removeErrorMessage()
    }, 3000)

    return ()=>clearTimeout(timeout)
})

function removeErrorMessage() {
    const errorSpans = [...document.querySelectorAll('.error')];

    errorSpans.forEach(span =>{
        span.remove();
    })
}



// օգտագործելով https://jsonplaceholder.typicode.com/todos hղումը ներբեռնեք todo list-ը և նկարեք էկրանին todo-ների title-ները։ 
// Title-ին սեղմելուց այն պետք է գույնը փոխի և կողքը իր id պետք է նկարվի


const url = 'https://jsonplaceholder.typicode.com/todos';
 
function renderingItems(list) {
    return list.map(item =>{
        const {id, title} = item;
        return `
            <div>
                <span onclick='addingFunc(this, ${id})'>${title}</span>
            </div>`;
    }).join('');
}
 
 
fetch(url)
    .then(res =>res.json())
    .then(data => {
        document.body.innerHTML = renderingItems(data)
    })
 
 
function addingFunc(e, id) {
    e.style.color = 'red';
    const span = document.createElement('span');
    span.innerText = id;
    e.after(span)
}
