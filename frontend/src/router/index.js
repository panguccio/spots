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
import BookField from "@/views/fields/BookField.vue"
import FieldBookings from "@/views/fields/FieldBookings.vue"
import FieldBooking from "@/views/fields/FieldBooking.vue"

// teams
import PlayerList from "@/views/teams/PlayerList.vue"
import TeamList from "@/views/teams/TeamList.vue"
import TeamNew from "@/views/teams/TeamNew.vue"
import Team from "@/views/teams/Team.vue"
import TeamEdit from "@/views/teams/TeamEdit.vue"
import TeamPlayers from "@/views/teams/TeamPlayers.vue"

// tournaments
import TournamentList from "@/views/tournaments/TournamentList.vue"
import TournamentNew from "@/views/tournaments/TournamentNew.vue"
import Tournament from "@/views/tournaments/Tournament.vue"
import TournamentEdit from "@/views/tournaments/TournamentEdit.vue"
import TournamentSchedule from "@/views/tournaments/TournamentSchedule.vue"
import TournamentStandings from "@/views/tournaments/TournamentStandings.vue"
import Match from "@/views/matches/Match.vue"
import MatchResult from "@/views/matches/MatchResult.vue"



const routes = [
  { path: "/", name: "home", component: Home },

  { path: "/login", name: "login", component: Login},
  { path: "/signup", name: "signup", component: Signup},
  { path: "/users", name: "userlist", component: UserList},
  { path: "/whoami", name: "profile", component: Profile},
  { path: "/users/:id", name: "user", component: User},

  { path: "/fields", name: "fieldlist", component: FieldList},
  { path: "/fields/:id", name: "field", component: Field},
  { path: "/fields/:id/slots", name: "bookfield", component: BookField},
  { path: "/fields/:id/bookings", name: "fieldbookings", component: FieldBookings},
  { path: "/fields/:id/bookings/:bookingId", name: "fieldbooking", component: FieldBooking},

  { path: "/players", name: "playerlist", component: PlayerList},
  { path: "/teams", name: "teamlist", component: TeamList},
  { path: "/teams/new", name: "teamnew", component: TeamNew},
  { path: "/teams/:id", name: "team", component: Team},
  { path: "/teams/:id/edit", name: "teamedit", component: TeamEdit}, // also for deleting it
  { path: "/teams/:id/players", name: "teamplayers", component: TeamPlayers},
  { path: "/tournaments", name: "tournamentlist", component: TournamentList},
  { path: "/tournaments/new", name: "tournamentnew", component: TournamentNew},
  { path: "/tournaments/:id", name: "tournament", component: Tournament},
  { path: "/tournaments/:id/edit", name: "tournamentedit", component: TournamentEdit}, // also for deleting it
  { path: "/tournaments/:id/schedule", name: "tournamentschedule", component: TournamentSchedule}, // if organizer, can generate it, if not can only see it
  { path: "/tournaments/:id/standings", name: "touramentstandings", component: TournamentStandings},
  { path: "/matches/:id", name: "match", component: Match},
  { path: "/matches/:id/result", name: "matchresult", component: MatchResult},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
