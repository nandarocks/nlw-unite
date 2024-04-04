let participantes = [
  {
    nome: "Fernanda Rocha",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Camila Rodrigues",
    email: "camila@gmail.com",
    dataInscricao: new Date(2024, 2, 16, 10, 20),
    dataCheckIn: null
  },
  {
    nome: "Miguel Silva",
    email: "miguel@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 14, 30),
    dataCheckIn: new Date(2024, 2, 23, 11, 45)
  },
  {
    nome: "Maria Santos",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 9, 0),
    dataCheckIn: new Date(2024, 2, 24, 12, 10)
  },
  {
    nome: "Diogo Costa",
    email: "diogo@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 16, 40),
    dataCheckIn: null
  },
  {
    nome: "Inês Oliveira",
    email: "ines@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 8, 20),
    dataCheckIn: new Date(2024, 2, 26, 11, 55)
  },
  {
    nome: "João Pereira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 13, 10),
    dataCheckIn: new Date(2024, 2, 27, 17, 45)
  },
  {
    nome: "Carolina Gonçalves",
    email: "carolina@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 50),
    dataCheckIn: new Date(2024, 2, 28, 9, 15)
  },
  {
    nome: "Rui Fernandes",
    email: "rui@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 18, 30),
    dataCheckIn: new Date(2024, 2, 29, 14, 20)
  },
  {
    nome: "Ana Santos",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 11, 20),
    dataCheckIn: new Date(2024, 2, 30, 16, 35)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
     <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
    Confirm check-in
     </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
       ${participante.nome}
      </strong>
      <br>
      <small>   
        ${participante.email}
      </small>        
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output= ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document
  .querySelector('tbody')
  .innerHTML = output
  }

  atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault ()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email already exists!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name=nome]').value = ""
  event.target.querySelector('[name=email]').value = ""
}

const fazerCheckIn = (event) => {
  
  const mensagemConfirmacao = 'Are you sure you would like to check-in?'
  
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante= participantes.find((p) =>{
    return p.email == event.target.dataset.email
  })
  participante.dataCheckIn = new Date ()

  atualizarLista(participantes) 
  
}