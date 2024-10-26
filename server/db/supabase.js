const { createClient } = require('@supabase/supabase-js');

// Substitua pelos valores da sua instância do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase

// const getData = async () => {
//     const { data, error } = await supabase
//       .from('cliente')
//       .select('*');
  
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(data);
//     }
//   };

//   getData();

const getEndereco = async () => {
  const { data, error } = await supabase
      .from('endereco_cliente')
      .select('*');
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
}

getEndereco();


// const getClient = async () => {
//   let { data: cliente, error } = await supabase
//   .from('cliente')
//   .select('id')
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(cliente);
//   }
// };

// getClient();

