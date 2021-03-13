export const sampleDocument = {
  id: 362,
  year: 2020,
  title: "2020-05-09 Results (2 Man Scramble)",
  document_type: "R",
  file: "http://localhost:8000/media/documents/2020/2020-05-09_2-Man_Scramble_Results.pdf",
  event: { id: 295, name: "2 Man Scramble", event_type: "W" },
  created_by: "import",
  last_update: "2020-05-09T18:48:35-05:00",
}

export const documentTypeMap = new Map([
  ["R", "Event Results"],
  ["T", "Event Tee Times"],
  ["P", "Season Long Points"],
  ["D", "Dam Cup"],
  ["M", "Match Play"],
  ["F", "Financial Statements"],
  ["S", "Sign Up"],
  ["O", "Other"],
])

function BhmcDocument(json) {
  this.id = json.id
  this.year = json.year
  this.title = json.title
  this.documentType = json.document_type
  this.file = json.file
  this.eventType = json.event_type
  this.lastUpdate = new Date(json.last_update)

  this.eventTypeCode = () => {
    if (this.eventType === "N" || this.eventType === "W") {
      return this.eventType
    }
    return "O"
  }
}

export default BhmcDocument
