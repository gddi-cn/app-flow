import produce from 'immer'
import { Dictionary, Lang } from '../types/dictionary'
import { MyState } from './useStore'
import { GetState, SetState } from 'zustand'
import { cn, en } from '../dictionary'

export interface LangSlice {
  lang: Lang
  dictionary: Dictionary
  setLang(lang: LangSlice['lang']): void
}

export const getDictionary = (lang: Lang): Dictionary => {
  switch (lang) {
    case 'cn':
      return cn
    case 'en':
      return en
    default:
      return cn
  }
}

const createLangSlice = (
  set: SetState<MyState>,
  get: GetState<MyState>
): LangSlice => ({
  lang: 'cn',
  dictionary: getDictionary('cn'),
  setLang: (lang: Lang) => {
    set(
      produce((draft: MyState) => {
        const draft1 = draft
        draft1.lang = lang
        draft1.dictionary = getDictionary(lang)
      })
    )
  }
})

export default createLangSlice
