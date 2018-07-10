#!/usr/bin/env node

const { execSync } = require('child_process')

const text = execSync('git log -n 1 --format=format:%s', { encoding: 'utf8' })

const emojis = {
  tada: ['initial'],
  bug: ['bug', 'glitch'],
  memo: ['docs', 'documentation'],
  zap: ['performance', 'performant'],
  art: ['format'],
  fire: ['delete', 'deleted', 'remove', 'removed'],
  ambulance: ['hotfix'],
  sparkles: ['feature', 'features'],
  rocket: ['deploy', 'deploys', 'deploying', 'deployed'],
  lipstick: ['ui', 'style', 'styles'],
  lock: ['security', 'crypto'],
  bookmark: ['tag', 'release', 'bump'],
  construction: ['wip'],
  arrow_down: ['downgrade', 'downgrading', 'downgraded'],
  arrow_up: ['upgrade', 'upgrading', 'upgraded'],
  construction_worker: ['build', 'ci'],
  recycle: ['refactor', 'refactoring', 'refactored'],
  whale: ['docker', 'dockerfile', 'container'],
  wrench: ['config', 'configuration'],
  globe_with_meridians: ['localization', 'internationalization', 'i18n', 'l10n'],
  pencil2: ['typo', 'typos'],
  hankey: ['smell'],
  rewind: ['revert', 'reverts', 'reverted'],
  twisted_rightwards_arrows: ['merge', 'merging', 'merged'],
  package: ['package', 'dependency', 'dependencies', 'module', 'modules'],
  truck: ['move', 'moved', 'moving', 'migration', 'migrated'],
  page_facing_up: ['license'],
  boom: ['breaking', 'break', 'breaks'],
  wheelchair: ['accessibility'],
  loud_sound: ['log', 'logs'],
  children_crossing: ['ux', 'usability'],
  building_construction: ['architecture', 'architectural'],
  iphone: ['mobile', 'smartphone'],
  clown_face: ['mock', 'mocking', 'mocks'],
  see_no_evil: ['ignore', 'gitignore'],
  camera_flash: ['snapshots', 'snapshot']
}

const reversed = Object.keys(emojis).reduce((obj, key) => {
  const arr = emojis[key]
  arr.forEach(word => {
    obj[word] = key
  })
  return obj
}, {})

const words = text.toLowerCase().split(/\s/g)

const scores = {}
words.forEach(word => {
  const emoji = reversed[word]
  if (emoji) {
    scores[emoji] = (scores[emoji] || 0) + 1
  }
})

const sorted = Object.keys(scores).sort((a, b) => {
  return scores[b] - scores[a]
})

const code = sorted[0] || 'abc'
execSync(`git commit --amend -m ":${code}: ${text}"`)
