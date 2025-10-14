// Fetching the list of postgres DB from Supabase:

// Three functions, fetch the new_topics's first row, insert it into the learnt_topics table and delete it from the new_topics table

import { createClient } from '@supabase/supabase-js'
import dataSchema from './dataSchema'

// Initializing the Supabase client:
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
)


// Fetching the list of new_topics from Supabase:
// Returns the first row from the new_topics table
async function fetchNewTopics_FirstRow() {
  const { data, error } = await supabase
    .from('new_topics')
    .select('*')
    .order('id', { ascending: true })
    .limit(1)
  if (error) {
    console.error('Error fetching new_topics:', error)
    return ["An error occured"]
  }
  return data
}

// Adding data to the learnt_topics table:
// Receives the data in raw form, and appends it to the learnt_topics table after removing the id column
async function addToLearntTopics(sent_topic: dataSchema) {

  let appendData = {
    "created_at": sent_topic.created_at,
    "Topic": sent_topic.Topic,
    "Day": sent_topic.Day,
    "chapter": sent_topic.chapter
  }

  const { error } = await supabase
    .from('learnt_topics')
    .insert(appendData)

  if (error) {
    console.error('Error inserting topic:', error)
  }
}



// Deleting the new_topics table:
async function deleteNewTopics(row: dataSchema) {
  console.log(row.id)
  const { error } = await supabase
    .from('new_topics')
    .delete()
    .eq('id', Number(row.id))

  if (error) {
    console.error('Error deleting new_topics:', error)
  }
}

export {
  fetchNewTopics_FirstRow,
  addToLearntTopics,
  deleteNewTopics
}
