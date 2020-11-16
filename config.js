const path = require('path')
const env = require('./env')

let resUrl
let mp3FilePath
let dbHost
let dbUser
let dbPsw
if (env === 'dev') {
  resUrl =  'http://localhost:8082'
  mp3FilePath = '/Users/ARASHI/Desktop/resource/mp3'
  dbHost = 'localhost'
  dbUser = 'root'
  dbPsw = 'TTTtry123456'
} else if (env === 'prod') {
  resUrl = 'http://47.115.29.244'
  mp3FilePath = '/root/nginx/upload/mp3'
  dbHost = '47.115.29.244'
  dbUser = 'root'
  dbPsw = 'TTTtry123456'
}


const category = [
  'Biomedicine',
  'BusinessandManagement',
  'ComputerScience',
  'EarthSciences',
  'Economics',
  'Engineering',
  'Education',
  'Environment',
  'Geography',
  'History',
  'Laws',
  'LifeSciences',
  'Literature',
  'SocialSciences',
  'MaterialsScience',
  'Mathematics',
  'MedicineAndPublicHealth',
  'Philosophy',
  'Physics',
  'PoliticalScienceAndInternationalRelations',
  'Psychology',
  'Statistics'
]

module.exports = {
  resUrl,
  category,
  mp3FilePath,
  dbHost,
  dbUser,
  dbPsw
}