<template>
  <div class="leaderboard">
    <div class="leaderTitle">
      <h1>Leaderboard</h1>
      <i class="fa fa-trophy fa-5x" aria-hidden="true"></i>
    </div>
    <br>
    <h2>Top 10</h2>
    <hr>
    <ol>
      <li>Jimmy</li>
      <li>Jane</li>
      <li>Phill</li>
      <li>Rick</li>
      <li>Larry</li>
      <li>Fred</li>
      <li>Lindsay</li>
      <li>Ryan</li>
      <li>Joe</li>
      <li>Wendy</li>
    </ol>
  </div>
</template>

<script>

  export default {
    name: 'Leaderboard'
  }

</script>

<style>

.leaderboard {
    grid-area: leaderboard;
    margin-right: 50px;
}

</style>
