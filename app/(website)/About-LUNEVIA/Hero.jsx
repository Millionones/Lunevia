import React from 'react'
import PageHero from '../Components/PageHero'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const Hero = ({ hero }) => <PageHero {...(hero || PAGE_DEFAULTS.about.hero)} />

export default Hero
