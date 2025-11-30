import { basename } from "path";

export default function escapeFileName(name: string) {
  const newName = basename(name)

  if (!newName || newName === '.' || newName === '..') {
    throw new Error('Неподходящее имя файла')
  }

  return newName
}