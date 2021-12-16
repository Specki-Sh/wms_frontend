<template>
  <div class="cards-list">
    <router-link to="/contractors/customer">
      <div class="card 1">
        <div class="card_image">
          <img
            src="https://design4users.com/wp-content/uploads/2021/03/digital-art-andrey-prokopenko-illustration-2.png.pagespeed.ce.UKMkAOME86.png"
          />
        </div>
        <div class="card_title title-white">
          <p>Customer</p>
        </div>
      </div>
    </router-link>
    <router-link to="/contractors/supplier">
      <div class="card 2">
        <div class="card_image">
          <img
            src="https://design4users.com/wp-content/uploads/2021/03/digital-art-andrey-prokopenko-illustration-14.png.pagespeed.ce.LZBlzA6_Y7.png"
          />
        </div>
        <div class="card_title title-white">
          <p>Supplier</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.cards-list {
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.4s;
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.card .card_title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-top: -80px;
  height: 40px;
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
}

.title-white {
  color: white;
}

.title-black {
  color: black;
}

@media all and (max-width: 500px) {
  .card-list {
    flex-direction: column;
  }
}
</style>
