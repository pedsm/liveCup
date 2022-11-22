import { DateTime } from "luxon"

const emojiList = ['🍕', '🍗', '🍟', '🌭', '🌮']

export function getFood() {
    return emojiList[DateTime.now().day % emojiList.length]
}