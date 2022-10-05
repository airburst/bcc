import { groupRides } from './transformRideData';
const rideData = [
  {
    id: 'cl8t768gj0005tltu6tdxqnzt',
    name: 'Paceline',
    group: 'UBER',
    date: '2022-10-08T09:00:00.000Z',
    destination: null,
    distance: 70,
    route: null,
    leader: null,
    speed: 39,
    users: []
  },
  {
    id: 'cl8t768gj0006tltu56esvkgr',
    name: 'Paceline',
    group: 'FAST1',
    date: '2022-10-08T09:00:00.000Z',
    destination: null,
    distance: 70,
    route: null,
    leader: null,
    speed: 36,
    users: []
  },
  {
    id: 'cl8t768gj0007tltu29ce1d5g',
    name: 'Paceline',
    group: 'FAST2',
    date: '2022-10-08T09:00:00.000Z',
    destination: null,
    distance: 70,
    route: null,
    leader: null,
    speed: 34,
    users: []
  },
  {
    id: 'cl8t768gj0008tltuqbrtf98f',
    name: 'Paceline',
    group: 'Mods',
    date: '2022-10-08T09:00:00.000Z',
    destination: null,
    distance: 70,
    route: null,
    leader: null,
    speed: 29,
    users: []
  },
  {
    id: 'cl8t768gk0009tltuj1b4ni4o',
    name: 'Paceline',
    group: 'Rockers',
    date: '2022-10-08T09:00:00.000Z',
    destination: null,
    distance: 70,
    route: null,
    leader: null,
    speed: 27,
    users: []
  },
  {
    id: 'cl8t768gk000atltux8twe65k',
    name: 'Saturday Social',
    group: 'Slow',
    date: '2022-10-08T10:00:00.000Z',
    destination: 'Sherston',
    distance: 52,
    route: 'https://route-link',
    leader: null,
    speed: null,
    users: []
  },
  {
    id: 'cl8t768gi0000tltubbv0imek',
    name: 'Sunday Ride',
    group: 'DE',
    date: '2022-10-09T08:30:00.000Z',
    destination: 'Cheddar',
    distance: 112,
    route: 'https://ridegps.com/111111',
    leader: 'David Stoyle',
    speed: null,
    users: ['cl8umxaaf0000tlvhyztr8ste']
  },
  {
    id: 'cl8t768gj0001tltu1vjfvuig',
    name: 'Sunday Ride',
    group: 'E',
    date: '2022-10-09T08:30:00.000Z',
    destination: 'Cheddar',
    distance: 103,
    route: 'https://ridegps.com/222222',
    leader: 'David Oliver',
    speed: null,
    users: []
  },
  {
    id: 'cl8t768gj0002tltuuj0op2tp',
    name: 'Sunday Ride',
    group: 'DSL',
    date: '2022-10-09T08:30:00.000Z',
    destination: 'Cheddar',
    distance: 90,
    route: 'https://ridegps.com/333333',
    leader: 'Michael Duble',
    speed: null,
    users: []
  },
  {
    id: 'cl8t768gj0003tltu0hydapwl',
    name: 'Sunday Ride',
    group: 'A',
    date: '2022-10-09T08:30:00.000Z',
    destination: 'Chew Magna',
    distance: 82,
    route: 'https://ridegps.com/444444',
    leader: 'Andy Mericano',
    speed: null,
    users: []
  },
  {
    id: 'cl8t768gj0004tltudiuwqjqd',
    name: 'Sunday Ride',
    group: 'C',
    date: '2022-10-09T08:30:00.000Z',
    destination: 'Cheddar',
    distance: 78,
    route: 'https://ridegps.com/555555',
    leader: 'Julia Stoyle',
    speed: null,
    users: []
  }
];

export const transformTest = () => {
  console.log('Write tests', rideData);
};
