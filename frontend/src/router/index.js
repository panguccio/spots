import { createRouter, createWebHistory } from "vue-router"

// home
import Home from "@/views/Home.vue"

// users
import Login from "@/views/auth/Login.vue"
import Signup from "@/views/auth/Signup.vue"
import UserList from "@/views/users/UserList.vue"
import User from "@/views/users/User.vue"
import Profile from "@/views/users/Profile.vue"

// fields
import FieldList from "@/views/fields/FieldList.vue"
import Field from "@/views/fields/Field.vue"

// teams
import PlayerList from "@/views/teams/PlayerList.vue"
import TeamList from "@/views/teams/TeamList.vue"
import TeamNew from "@/views/teams/TeamNew.vue"
import Team from "@/views/teams/Team.vue"
import TeamEdit from "@/views/teams/TeamEdit.vue"

// tournaments
import TournamentList from "@/views/tournaments/TournamentList.vue"
import TournamentNew from "@/views/tournaments/TournamentNew.vue"
import Tournament from "@/views/tournaments/Tournament.vue"
import TournamentEdit from "@/views/tournaments/TournamentEdit.vue"
import MatchEdit from "@/views/tournaments/MatchEdit.vue"



const routes = [
  { path: "/", name: "home", component: Home },

  { path: "/login", name: "login", component: Login},
  { path: "/signup", name: "signup", component: Signup},
  { path: "/users", name: "users", component: UserList},
  { path: "/whoami", name: "profile", component: Profile},
  { path: "/users/:id", name: "user", component: User},

  { path: "/fields", name: "fields", component: FieldList},
  { path: "/fields/:id", name: "field", component: Field},

  { path: "/players", name: "playerlist", component: PlayerList},
  { path: "/teams", name: "teams", component: TeamList},
  { path: "/teams/new", name: "teamnew", component: TeamNew},
  { path: "/teams/:id", name: "team", component: Team},
  { path: "/teams/:id/edit", name: "teamedit", component: TeamEdit},
  
  { path: "/tournaments", name: "tournaments", component: TournamentList},
  { path: "/tournaments/new", name: "tournamentnew", component: TournamentNew},
  { path: "/tournaments/:id", name: "tournament", component: Tournament},
  { path: "/tournaments/:id/edit", name: "tournamentedit", component: TournamentEdit},
  { path: "/matches/:id", name: "match", component: MatchEdit},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
