const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');

async function load() {
  const response = await fetch('http://localhost:3333/').then((data) => data.json());

  console.log(response);

  response.urls.map(item => addElement(item));
}

load();

function addElement({ name, url }) {
  const li = document.createElement('li');
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () => removeElement(trash, name, url);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

async function removeElement(el, name, url) {
  if(confirm('Tem certeza que deseja deletar?')) {
    await fetch(`http://localhost:3333/?name=${ name }&url=${ url }&del=1`);
    el.parentNode.remove();
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let { value } = input;

  if(!value)
    return alert('Preencha o campo');

  const [name, url] = value.split(",");

  if(!url)
    return alert('formate o texto da maneira correta');

  if(!/^http/.test(url))
    return alert("Digite a url da maneira correta");

  addElement({ name, url });

  await fetch(`http://localhost:3333/?name=${ name }&url=${ url }`);

  input.value = "";
});