// "id": 1,
// "created_at": "2025-10-02T14:01:11.782234+00:00",
// "Topic": "My topic 1",
// "Day": 1,
// "Chapter": "testone"

<<<<<<< HEAD

type dataSchema = {
    id: number,
    created_at: Date,
    Topic: string,
    Day: string,
    Chapter: string,
}

export default dataSchema
=======
type dataSchema = {
  id: number;
  created_at: Date;
  Topic: string;
  Day: string;
  Chapter: string;
};

export type learnt_data_Schema = {
//   id: number;
  created_at: Date | string;
  Topic: string;
  Day: string;
  Chapter: string;
  sent_at: Date | string;
};

export default dataSchema;
>>>>>>> upstream/main
