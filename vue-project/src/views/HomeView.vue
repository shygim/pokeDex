<script setup>
import { ref, computed } from 'vue'

const dblSwitch = ref(false)

const firstName = ref('')

let filteredPokemon = computed(() =>
  allPokemons.value.filter((pokemon) => pokemon.name.includes(firstName.value))
)

const allPokemons = ref([''])

const fetchNum = 1025

const koreanNames = []

const urls = []
const myTeamCount = ref(0)
const enemyTeamCount = ref(0)

for (let i = 0; i < fetchNum; i++) {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`
  urls.push(url)
}

const requests = urls.map((url) => fetch(url))

// const korName =
Promise.all(requests)
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((results) => {
    for (let result of results) {
      // console.log(result.names[2].name)
      koreanNames.push(result.names[2].name)
    }

    // console.log(koreanNames)

    fetchPokemon()
  })

// const fetchKantoPokemon = () => {
//   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//     .then((response) => response.json())
//     .then((allpokemon) => console.log(allpokemon))
//     .then((allpokemon) => (allPokemons.value = allpokemon.results))
// }

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${fetchNum}`
  const res = await fetch(url)
  const data = await res.json()

  // const loadedPokemon = data.results.map((pokemon, index) => {
  //   return {
  //     name: koreanNames[index],
  //     id: index + 1,
  //     image: `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
  //   }
  // })
  allPokemons.value = data.results.map((pokemon, index) => {
    return {
      name: koreanNames[index],
      id: index + 1,
      image: `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }
  })
  console.log(allPokemons.value[0])
  // allPokemons.value = loadedPokemon

  testObj.value = allPokemons.value[0]
}

const testObj = ref([])
const resetMyTeam = () => {
  myTeamCount.value = 0
  myTeams.value = []
}

const myTeams = ref([])
const enemyTeams = ref([])
const randomEnemyTeam = () => {
  enemyTeams.value = []
  for (let i = 0; i < 6; i++) {
    enemyTeams.value.push(Math.floor(Math.random() * (fetchNum + 1)))
  }
}

const clickTimer = ref()

const detailInfo = async (event) => {
  infoResult.value = {} //Info 조회전 모달입력값 초기화

  if (dblSwitch.value == true) {
    return console.log()
  } else {
    clickTimer.value = setTimeout(() => {
      console.log('Single click event')
      myModal.style.display = 'block'
    }, 1000) // 250ms 이후에 단일 클릭 이벤트로 처리
    const id = event.target.id
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()

    const myModal = document.getElementById('myModal')
    console.log(pokemon)
    infoResult.value.name = koreanNames[id - 1]
    infoResult.value.type0 = pokemon.types[0].type.name
    infoResult.value.type1 = pokemon.types[1].type.name

    console.log(infoResult.value.image)

    infoResult.value.image = `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${id}.png`

    ///////////////////////////
  }
}
const addCard = (event) => {
  dblSwitch.value = true
  if (clickTimer.value) clearTimeout(clickTimer.value)
  clickTimer.value = null
  console.log(clickTimer)
  //원클릭 시 타임아웃 후 이벤트발생변수를 제거
  if (myTeamCount.value < 6 && !myTeams.value.includes(event.target.id)) {
    console.log(`Added event.target.id: ${event.target}`)

    console.log(`Added event.target.id: ${event.target.id}`)

    myTeams.value.push(event.target.id)
    myTeamCount.value++
    console.log(myTeams.value)
    dblSwitch.value = false

    // const pokemon = allPokemons.value[event.target.id - 1]
    // const mainLeftElement = document.getElementById('main-left')
    // const cardComponent = document.createComponent('cardComponent')
    // cardComponent.testObj = pokemon
    // mainLeftElement.appendChild(cardComponent)
    // console.log(cardComponent)
  }
}
const removeCard = (event) => {
  console.log(event.target.id)

  myTeams.value = myTeams.value.filter((teamId) => teamId !== event.target.id)

  if (myTeamCount.value > 0) myTeamCount.value--
  // }
}

const removeCard2 = (event) => {
  console.log(`Revomed event.target.id: ${event.target.id}`)

  console.log(enemyTeams.value)
  enemyTeams.value = enemyTeams.value.filter((teamId) => teamId !== parseInt(event.target.id))

  console.log(enemyTeams.value)

  if (enemyTeamCount.value > 0) enemyTeamCount.value--
  // }
}

const receiveMessage = (message) => {
  myTeams.value.push(message)
  myTeamCount.value++ // addCard()
}

const infoResult = ref({ image: '@/assets/logo.png' })

const closeModal = (event) => {
  // 이벤트 대상이 버튼인지 확인
  if (event.target.tagName === 'BUTTON') {
    // 버튼 상위의 가장 가까운 모달 찾기
    const closestModal = event.target.closest('.modal')
    if (closestModal) {
      closestModal.style.display = 'none'
    }
  }
}

////////////타이머 관련//////
const lastClickTime = ref(0)

const handleClick = (event) => {
  lastClickTime.value = new Date().getTime()
}

const handleDoubleClick = (event) => {
  const currentTime = new Date().getTime()
  const timeDiff = currentTime - lastClickTime.value
  if (timeDiff < 300) {
    // 더블 클릭 간격 설정 (300ms)
    addCard(event)
  } else {
    detailInfo(event)
  }
}

/////////////////////////////////////////
</script>

<template>
  <!-- 
  <button @click="fetchPokemon">버튼2</button>
  <button @click="test">콘솔</button>
  <button @click="korName">korName 버튼</button> -->
  <!-- let filteredPokemon = computed(() => -->

  <main style="width: inherit; display: flex; justify-content: space-between">
    <div
      id="main-left"
      class="main-left"
      style="
        position: sticky;
        background-color: green;
        top: 0;
        margin-left: calc(5% - 100px);
        width: 8vw;
        color: white;
      "
    >
      <p style="font-size: 20px">My Teams</p>

      <p>{{ myTeamCount }}</p>
      <button @click="resetMyTeam">팀 초기화</button>

      <div
        v-for="(id, index) in myTeams"
        :key="index"
        style="display: flex; justify-content: space-between; margin: 10px"
      >
        <cardComponent :testObj="allPokemons[id - 1]" />
        <button :id="`${id}`" @click="removeCard">제거</button>
      </div>
      <!-- <cardComponent :testObj="null" /> -->
    </div>

    <div class="main-center">
      <!-- //메인 센터 시작-->
      <div id="searchForm">
        검색명:
        <input v-model="firstName" />
        <!-- <button @click="detailInfo">상세 테스트</button> -->
      </div>
      <!-- 검색창 div -->
      <!-- 스크롤 div 시작-->
      <div
        id="table"
        class="overflow-y-auto"
        style="height: 960px; width: 80vw; overflow-y: scroll; background-color: red"
      >
        <!-- //검색조건이 없을 때를 위한 v-if div-->
        <div
          v-if="firstName === '' && allPokemons && allPokemons.length > 0"
          id="cards"
          class="grid gap-4"
        >
          <!-- //v-if 조건 확인 후 내부에서 전체 카드 v-for-->
          <div
            v-for="pokemon in allPokemons"
            @dblclick="addCard"
            @click="detailInfo"
            :key="pokemon.id"
          >
            <cardComponent :testObj="pokemon" @messageSent="receiveMessage" />
          </div>
        </div>

        <!-- //검색조건이 있을 때를 위한 v-else-if div-->
        <div v-else-if="firstName !== ''" id="cards" class="grid gap-4">
          <!-- //v-else-if 조건 확인 후 내부에서 전체 카드 v-for-->
          <div
            v-for="pokemon in filteredPokemon"
            @dblclick="addCard"
            @click="detailInfo"
            :key="pokemon.id"
          >
            <cardComponent @click.self="addCard" :testObj="pokemon" @messageSent="receiveMessage" />
          </div>
        </div>
      </div>
      <!-- 스크롤 div -->
    </div>
    <!-- main-center 끝 -->

    <div
      class="main-right"
      style="
        position: sticky;
        background-color: blue;
        top: 0;
        margin-left: calc(5% - 100px);
        width: 8vw;
        color: white;
      "
    >
      <h1>Enemies</h1>
      <button @click="randomEnemyTeam">randomEnemyTeam</button>

      <div
        v-for="(id, index) in enemyTeams"
        :key="index"
        style="display: flex; justify-content: space-between; margin: 10px"
      >
        <cardComponent :testObj="allPokemons[id - 1]" />
        <button :id="`${id}`" @click="removeCard2">제거</button>
      </div>
    </div>
  </main>

  <!-- 
const allPokemonList = allPokemons.value.map(pokemon => {
  return {
    name: pokemon.name,
    id: pokemon.id,
    image: pokemon.image
  }
}) -->

  <!-- 자식 컴포넌트인 PokeCard는 props로 pokeId를 받을 수 있습니다.
     PokeCard.vue에서는 defineProps를 사용하여 pokeId를 받을 수 있습니다.
     예를 들어 다음과 같습니다.
     const props = defineProps({
       pokeId: {
         type: Object,
         required: true
       }
     })
     그리고 PokeCard.vue의 template에서는 :pokeId를 사용하여 pokeId props를 전달받을 수 있습니다.
     <template>
       <div>
         <img :src="pokeId.image" :alt="pokeId.name" />
         <h2>{{ pokeId.name }}</h2>
       </div>
     </template>
   -->

  <!-- <p>{{ allPokemons.value }}</p> -->

  <div
    id="myModal"
    class="modal"
    style="
      display: none;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      position: fixed;
      width: 20vw;
      height: 20vw;
      background-color: gray;
      padding: 20px;
      color: white;
      opacity: 0.9;
    "
  >
    <div class="modal-content" style="display: grid">
      <!-- <span class="close">&times;</span> -->

      <p>이름: {{ infoResult.name }}</p>
      <p>타입:{{ infoResult.type0 }} / {{ infoResult.type1 }}</p>
      <img :src="infoResult.image" width="240px" height="240" />
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    /* display: grid; */
    align-items: center;
  }
}
main {
  display: flex;
}
</style>
