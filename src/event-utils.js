let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id:1,
    title: 'All-day event',
    start: todayStr,
    extendedProps: {
      department: 'BioChemistry'
    },
    customRender: true
  },
  {
    id: 2,
    title: `Timed event`,
    start: todayStr + 'T12:00:00',
    extendedProps: {
      department: 'BioChemistry'
    },
    customRender: true
    // "color": "yellow",   // an option!
    // "textColor": "red" // an option!
  },
  {
    "title": "Zippy",
    "id":3,
    "start": todayStr+" 10:00:00",
    "end": todayStr+" 11:30:00",
    display: 'background',
    color: '#ff9f89',
    extendedProps: {
      department: 'BioChemistry'
    },
    customRender: true
  }
]

export function createEventId() {
  return String(eventGuid++)
}