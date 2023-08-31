export type Message = {
  id: number;
  text: string;
  createdAt: Date;
  sender: string;
};

export type Character = {
  id: number;
  name: string;
  image: string;
  background: string;
};

export type History = {
  internal: [
    // optional array of strings 
        string[]?
  ];
  character: Character | null;
};



