import web3 from "web3";
import dotenv from 'dotenv';
dotenv.config()

const currentWeb3 = new web3(new web3.providers.HttpProvider(`https://eth-goerli.g.alchemy.com/v2/${process.env.API_KEY}`));

const contract = process.env.CONTRACT_ADDRESS;
const address_one = process.env.ADDRESS_ONE;
const address_two = process.env.ADDRESS_TWO;

const BN = web3.utils.BN;

// mapping keccak256(key,slot)
// array (keccak256(slot),index)

const getBytes32 = (args) => {
    return currentWeb3.utils.padLeft(args,64);
}

const getBytes = (data,allocate,previous_store) => {
    const previous_slot = Number(previous_store * 2);
    const slot = ((allocate / 8) * 2) ;
    const slice_value = data.slice(66 - (slot + previous_slot),66- previous_slot);
    const result = ("0x").concat(slice_value);
    const bytes32 = currentWeb3.utils.padLeft(result, 64);
    return (bytes32);
}

(async function() {
    const zero_slot = await currentWeb3.eth.getStorageAt(contract,0);
    const first_slot = await currentWeb3.eth.getStorageAt(contract,1);
    const second_slot = await currentWeb3.eth.getStorageAt(contract,2);
    const third_slot = await currentWeb3.eth.getStorageAt(contract,3);
    const fourth_slot = await currentWeb3.eth.getStorageAt(contract,4);
    const fiveth_slot = await currentWeb3.eth.getStorageAt(contract,5);

    const second_slot_one = getBytes(second_slot,8,0); // 1
    const second_slot_two = getBytes(second_slot,96,1); // 12
    const second_slot_three = getBytes(second_slot,8,13); // 1
    const second_slot_four = getBytes(second_slot,8,14); // 1

    const fiveth_slot_one = getBytes(fiveth_slot,160,0); // 20
    const fiveth_slot_two = getBytes(fiveth_slot,24,20); // 3
    const fiveth_slot_three = getBytes(fiveth_slot,32,23); // 4
    const fiveth_slot_four = getBytes(fiveth_slot,40,27); // 5

    console.log("");
    console.log("");
    console.log("Encoded-Varibale-Data",{
         "zero_slot": await currentWeb3.eth.abi.decodeParameter('address', zero_slot),
         "first_slot": await currentWeb3.eth.abi.decodeParameter('uint256', first_slot),
         "second_slot_one": await currentWeb3.eth.abi.decodeParameter('uint8', second_slot_one),
         "second_slot_two": await currentWeb3.eth.abi.decodeParameter('uint96', second_slot_two),
         "second_slot_three": await currentWeb3.eth.abi.decodeParameter('bool', second_slot_three),
         "second_slot_four": await currentWeb3.eth.abi.decodeParameter('uint8', second_slot_four),
         "third_slot": await currentWeb3.eth.abi.decodeParameter('address', third_slot),
         "fourth_slot": await currentWeb3.eth.abi.decodeParameter('uint256', fourth_slot),
         "fiveth_slot_one": await currentWeb3.eth.abi.decodeParameter('address', fiveth_slot_one),
         "fiveth_slot_two": await currentWeb3.eth.abi.decodeParameter('uint24', fiveth_slot_two),
         "fiveth_slot_three": await currentWeb3.eth.abi.decodeParameter('uint32', fiveth_slot_three),
         "fiveth_slot_four": await currentWeb3.eth.abi.decodeParameter('uint40', fiveth_slot_four),
    });
    console.log("");
    console.log("");

    const map_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(6));  
    const map_hash_2 = await currentWeb3.utils.soliditySha3(getBytes32(address_two),getBytes32(6));  
    const map_hash_3 = await currentWeb3.utils.soliditySha3(getBytes32(897),getBytes32(7));  
    const map_hash_4 = await currentWeb3.utils.soliditySha3(getBytes32(797),getBytes32(7));
    const map_hash_5 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(8));  
    const map_hash_6 = await currentWeb3.utils.soliditySha3(getBytes32(address_two),getBytes32(8));
    const map_hash_7 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(9));  
    const map_hash_8 = await currentWeb3.utils.soliditySha3(getBytes32(address_two),getBytes32(9)); 

    const sixth_slot_map_one =  await currentWeb3.eth.getStorageAt(contract,map_hash_1);
    const sixth_slot_map_two =  await currentWeb3.eth.getStorageAt(contract,map_hash_2);
    const seven_slot_map_one =  await currentWeb3.eth.getStorageAt(contract,map_hash_3);
    const seven_slot_map_two =  await currentWeb3.eth.getStorageAt(contract,map_hash_4);
    const eight_slot_map_one =  await currentWeb3.eth.getStorageAt(contract,map_hash_5);
    const eight_slot_map_two =  await currentWeb3.eth.getStorageAt(contract,map_hash_6);
    const nine_slot_map_one =  await currentWeb3.eth.getStorageAt(contract,map_hash_7);
    const nine_slot_map_two =  await currentWeb3.eth.getStorageAt(contract,map_hash_8);

    console.log("");
    console.log("");
    console.log("Encoded-Mapping-Data",{
         "sixth_slot_map_one": await currentWeb3.eth.abi.decodeParameter('uint256', sixth_slot_map_one),
         "sixth_slot_map_two": await currentWeb3.eth.abi.decodeParameter('uint256', sixth_slot_map_two),
         "seven_slot_map_one": await currentWeb3.eth.abi.decodeParameter('address', seven_slot_map_one),
         "seven_slot_map_two": await currentWeb3.eth.abi.decodeParameter('address', seven_slot_map_two),
         "eight_slot_map_one": await currentWeb3.eth.abi.decodeParameter('bool', eight_slot_map_one),
         "eight_slot_map_two": await currentWeb3.eth.abi.decodeParameter('bool', eight_slot_map_two),
         "nine_slot_map_one": await currentWeb3.eth.abi.decodeParameter('uint256', nine_slot_map_one),
         "nine_slot_map_two": await currentWeb3.eth.abi.decodeParameter('uint256', nine_slot_map_two),
    });
    console.log("");
    console.log("");

    let array_slot_1 = await currentWeb3.utils.soliditySha3(getBytes32(10));
    let array_slot_2 = await currentWeb3.utils.soliditySha3(getBytes32(11));
    const array_hash_1 =  await currentWeb3.utils.numberToHex(new BN(array_slot_1).add(new BN(0)));  
    const array_hash_2 =  await currentWeb3.utils.numberToHex(new BN(array_slot_1).add(new BN(1)));  
    const array_hash_3 =  await currentWeb3.utils.numberToHex(new BN(array_slot_1).add(new BN(2)));  
    const array_hash_4 =  await currentWeb3.utils.numberToHex(new BN(array_slot_2).add(new BN(0)));
    const array_hash_5 =  await currentWeb3.utils.numberToHex(new BN(array_slot_2).add(new BN(1)));    

    const tenth_slot_array_one =  await currentWeb3.eth.getStorageAt(contract,array_hash_1);
    const tenth_slot_array_two =  await currentWeb3.eth.getStorageAt(contract,array_hash_2);
    const tenth_slot_array_three =  await currentWeb3.eth.getStorageAt(contract,array_hash_3);
    const slot_map_two_11 =  await currentWeb3.eth.getStorageAt(contract,array_hash_4);
    const slot_map_two_12 =  await currentWeb3.eth.getStorageAt(contract,array_hash_5);

    console.log("");
    console.log("");
    console.log("Encoded-Array-Data",{
         "tenth_slot_array_one": await currentWeb3.eth.abi.decodeParameter('uint256', tenth_slot_array_one),
         "tenth_slot_array_two": await currentWeb3.eth.abi.decodeParameter('uint256', tenth_slot_array_two),
         "tenth_slot_array_three": await currentWeb3.eth.abi.decodeParameter('uint256', tenth_slot_array_three),
         "slot_map_two_11": await currentWeb3.eth.abi.decodeParameter('address', slot_map_two_11),
         "slot_map_two_12": await currentWeb3.eth.abi.decodeParameter('address', slot_map_two_12),
        //  "eight_slot_map_two": await currentWeb3.eth.abi.decodeParameter('bool', eight_slot_map_two),
        //  "nine_slot_map_one": await currentWeb3.eth.abi.decodeParameter('uint256', nine_slot_map_one),
        //  "nine_slot_map_two": await currentWeb3.eth.abi.decodeParameter('uint256', nine_slot_map_two),
    });
    console.log("");
    console.log("");


    console.log("");
    console.log("");
    let slot_12_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(12));
    let slot_12_key_1 = await currentWeb3.utils.soliditySha3(slot_12_hash_1);
    let slot_12_hash_2 = await currentWeb3.utils.soliditySha3(getBytes32(address_two),getBytes32(12));
    let slot_12_key_2 = await currentWeb3.utils.soliditySha3(slot_12_hash_2);

    let slot_13_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(8542123),getBytes32(13));
    let slot_13_key_1 = await currentWeb3.utils.soliditySha3(slot_13_hash_1);
    let slot_13_hash_2 = await currentWeb3.utils.soliditySha3(getBytes32(3634648),getBytes32(13));
    let slot_13_key_2 = await currentWeb3.utils.soliditySha3(slot_13_hash_2);

    const slot_12_slot_key_1 =  await currentWeb3.utils.numberToHex(new BN(slot_12_key_1).add(new BN(0)));  
    const slot_12_slot_key_2 =  await currentWeb3.utils.numberToHex(new BN(slot_12_key_2).add(new BN(0)));  

    const slot_13_slot_key_1 =  await currentWeb3.utils.numberToHex(new BN(slot_13_key_1).add(new BN(0)));  
    const slot_13_slot_key_2 =  await currentWeb3.utils.numberToHex(new BN(slot_13_key_2).add(new BN(0)));     

    const slot_12_one =  await currentWeb3.eth.getStorageAt(contract,slot_12_slot_key_1);
    const slot_12_two =  await currentWeb3.eth.getStorageAt(contract,slot_12_slot_key_2);
    const slot_13_one =  await currentWeb3.eth.getStorageAt(contract,slot_13_slot_key_1);
    const slot_13_two =  await currentWeb3.eth.getStorageAt(contract,slot_13_slot_key_2);

    console.log("");
    console.log("");
    console.log("Encoded-Array-Data",{
         "slot_12_one": await currentWeb3.eth.abi.decodeParameter('uint256', slot_12_one),
         "slot_12_two": await currentWeb3.eth.abi.decodeParameter('uint256', slot_12_two),
         "slot_13_one": await currentWeb3.eth.abi.decodeParameter('address', slot_13_one),
         "slot_13_two": await currentWeb3.eth.abi.decodeParameter('address', slot_13_two),
    });
    console.log("");
    console.log("");

    console.log("");
    console.log("");
    let slot_14_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(14));
    let slot_14_key_1 = await currentWeb3.utils.soliditySha3(getBytes32(7),getBytes32(slot_14_hash_1));
    let slot_14_hash_2 = await currentWeb3.utils.soliditySha3(getBytes32(address_two),getBytes32(14));
    let slot_14_key_2 = await currentWeb3.utils.soliditySha3(getBytes32(8),getBytes32(slot_14_hash_2));

    let slot_15_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(15));
    let slot_15_hash_1_1 = await currentWeb3.utils.soliditySha3(getBytes32(5),getBytes32(slot_15_hash_1));
    let slot_15_key_1 = await currentWeb3.utils.soliditySha3(slot_15_hash_1_1);
    let slot_15_hash_2 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(15));
    let slot_15_hash_2_1 = await currentWeb3.utils.soliditySha3(getBytes32(4),getBytes32(slot_15_hash_2));
    let slot_15_key_2 = await currentWeb3.utils.soliditySha3(slot_15_hash_2_1);

    const slot_15_slot_key_1 =  await currentWeb3.utils.numberToHex(new BN(slot_15_key_1).add(new BN(0)));  
    const slot_15_slot_key_2 =  await currentWeb3.utils.numberToHex(new BN(slot_15_key_2).add(new BN(0)));    

    const slot_14_one =  await currentWeb3.eth.getStorageAt(contract,slot_14_key_1);
    const slot_14_two =  await currentWeb3.eth.getStorageAt(contract,slot_14_key_2);
    const slot_15_one =  await currentWeb3.eth.getStorageAt(contract,slot_15_slot_key_1);
    const slot_15_two =  await currentWeb3.eth.getStorageAt(contract,slot_15_slot_key_2);

    console.log("");
    console.log("");
    console.log("Encoded-Array-Data",{
         "slot_14_one": await currentWeb3.eth.abi.decodeParameter('bytes32', slot_14_one),
         "slot_14_two": await currentWeb3.eth.abi.decodeParameter('bytes32', slot_14_two),
         "slot_15_one": await currentWeb3.eth.abi.decodeParameter('uint256', slot_15_one),
         "slot_15_two": await currentWeb3.eth.abi.decodeParameter('uint256', slot_15_two),
    });
    console.log("");
    console.log("");


    console.log("");
    console.log("");
    const slot_16 =  await currentWeb3.eth.getStorageAt(contract,16);
    const slot_17 =  await currentWeb3.eth.getStorageAt(contract,17);
    const slot_18 =  await currentWeb3.eth.getStorageAt(contract,18);
    

    const array_slot_19 = await currentWeb3.utils.soliditySha3(getBytes32(19));

    const slot_19_slot_key_0 =  await currentWeb3.utils.numberToHex(new BN(array_slot_19).add(new BN(0)));  
    const slot_19_slot_key_1 =  await currentWeb3.utils.numberToHex(new BN(array_slot_19).add(new BN(1)));  
    const slot_19_slot_key_2 =  await currentWeb3.utils.numberToHex(new BN(array_slot_19).add(new BN(2)));    

    const slot_19_index_0 =  await currentWeb3.eth.getStorageAt(contract,slot_19_slot_key_0);
    const slot_19_index_1 =  await currentWeb3.eth.getStorageAt(contract,slot_19_slot_key_1);
    const slot_19_index_2 =  await currentWeb3.eth.getStorageAt(contract,slot_19_slot_key_2);
    const slot_20 =  await currentWeb3.eth.getStorageAt(contract,20);
    const slot_21 =  await currentWeb3.eth.getStorageAt(contract,21);
    const slot_22 =  await currentWeb3.eth.getStorageAt(contract,22);
    const slot_23 =  await currentWeb3.eth.getStorageAt(contract,23);
    const slot_24 =  await currentWeb3.eth.getStorageAt(contract,24);
    const slot_25 =  await currentWeb3.eth.getStorageAt(contract,25);
    const slot_26 =  await currentWeb3.eth.getStorageAt(contract,26);
    const slot_27 =  await currentWeb3.eth.getStorageAt(contract,27);
    const slot_28 =  await currentWeb3.eth.getStorageAt(contract,28);  

    // string convert
    const slot_16_str = await currentWeb3.utils.toHex(slot_16);
    const slot_16_convert = await currentWeb3.utils.hexToAscii(slot_16_str);
    const slot_19_index_1_str = await currentWeb3.utils.toHex(slot_19_index_0);
    const slot_19_index_2_convert = await currentWeb3.utils.hexToAscii(slot_19_index_1_str);
    const slot_20_str = await currentWeb3.utils.toHex(slot_20);
    const slot_20_convert = await currentWeb3.utils.hexToAscii(slot_20_str);    
    const slot_23_str = await currentWeb3.utils.toHex(slot_23);
    const slot_23_convert = await currentWeb3.utils.hexToAscii(slot_23_str);    
    const slot_26_str = await currentWeb3.utils.toHex(slot_26);
    const slot_26_convert = await currentWeb3.utils.hexToAscii(slot_26_str);

    console.log("");
    console.log("slot_16_convert",slot_16_convert);
    console.log("slot_19_index_2_convert", slot_19_index_2_convert);
    console.log("slot_20_convert", slot_20_convert);
    console.log("slot_23_convert", slot_23_convert);
    console.log("slot_26_convert", slot_26_convert);
    console.log("Encoded-Array-Data",{
            "slot_17": await currentWeb3.eth.abi.decodeParameter('uint256', slot_17),
            "slot_18": await currentWeb3.eth.abi.decodeParameter('address', slot_18),
            "slot_19_index_1": await currentWeb3.eth.abi.decodeParameter('uint256', slot_19_index_1),
            "slot_19_index_2": await currentWeb3.eth.abi.decodeParameter('address', slot_19_index_2),
            "slot_21": await currentWeb3.eth.abi.decodeParameter('uint256', slot_21),
            "slot_22": await currentWeb3.eth.abi.decodeParameter('address', slot_22),
            "slot_24": await currentWeb3.eth.abi.decodeParameter('uint256', slot_24),
            "slot_25": await currentWeb3.eth.abi.decodeParameter('address', slot_25),
            "slot_27": await currentWeb3.eth.abi.decodeParameter('uint256', slot_27),
            "slot_28": await currentWeb3.eth.abi.decodeParameter('address', slot_28),
    });
    console.log("");
    console.log("");




    console.log("");
    console.log("");  
    const struct_map_29 = await currentWeb3.utils.soliditySha3(getBytes32(432),getBytes32(29));

    let slot_30_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(5),getBytes32(30)); 
    let slot_30_key_1 = await currentWeb3.utils.soliditySha3(getBytes32(slot_30_hash_1)); 
    let slot_30_hash_2 = await currentWeb3.utils.soliditySha3(getBytes32(6),getBytes32(30)); 
    let slot_30_key_2 = await currentWeb3.utils.soliditySha3(getBytes32(slot_30_hash_2)); 

    let slot_31_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(31)); 
    let slot_31_key_1 = await currentWeb3.utils.soliditySha3(getBytes32(slot_31_hash_1)); 
    let slot_31_hash_2 = await currentWeb3.utils.soliditySha3(getBytes32(address_two),getBytes32(31)); 
    let slot_31_key_2 = await currentWeb3.utils.soliditySha3(getBytes32(slot_31_hash_2)); 

    const slot_29_key_0 =  await currentWeb3.utils.numberToHex(new BN(struct_map_29).add(new BN(0)));  
    const slot_29_key_1 =  await currentWeb3.utils.numberToHex(new BN(struct_map_29).add(new BN(1)));  
    const slot_29_key_2 =  await currentWeb3.utils.numberToHex(new BN(struct_map_29).add(new BN(2))); 
    
    const slot_30_slot_key_1 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_1).add(new BN(0)));  
    const slot_30_slot_key_2 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_1).add(new BN(1)));   
    const slot_30_slot_key_3 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_1).add(new BN(2)));   
    const slot_30_slot_key_4 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_1).add(new BN(3)));    
    const slot_30_slot_key_5 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_1).add(new BN(4)));    
    const slot_30_slot_key_6 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_1).add(new BN(5))); 
    const slot_30_slot_keytwo_1 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_2).add(new BN(0)));  
    const slot_30_slot_keytwo_2 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_2).add(new BN(1)));   
    const slot_30_slot_keytwo_3 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_2).add(new BN(2)));   
    const slot_30_slot_keytwo_4 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_2).add(new BN(3)));    
    const slot_30_slot_keytwo_5 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_2).add(new BN(4)));    
    const slot_30_slot_keytwo_6 =  await currentWeb3.utils.numberToHex(new BN(slot_30_key_2).add(new BN(5)));  
    
    const slot_31_slot_key_1 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(0)));  
    const slot_31_slot_key_2 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(1)));   
    const slot_31_slot_key_3 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(2)));   
    const slot_31_slot_key_4 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(3)));    
    const slot_31_slot_key_5 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(4)));    
    const slot_31_slot_key_6 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(5))); 
    const slot_31_slot_key_7 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(6)));  
    const slot_31_slot_key_8 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(7)));   
    const slot_31_slot_key_9 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(8)));   
    const slot_31_slot_key_10 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(9)));    
    const slot_31_slot_key_11 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(10)));    
    const slot_31_slot_key_12 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_1).add(new BN(11)));
    const slot_31_slot_keytwo_1 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_2).add(new BN(0)));  
    const slot_31_slot_keytwo_2 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_2).add(new BN(1)));   
    const slot_31_slot_keytwo_3 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_2).add(new BN(2)));   
    const slot_31_slot_keytwo_4 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_2).add(new BN(3)));    
    const slot_31_slot_keytwo_5 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_2).add(new BN(4)));    
    const slot_31_slot_keytwo_6 =  await currentWeb3.utils.numberToHex(new BN(slot_31_key_2).add(new BN(5)));  

    const slot_29_index_0 =  await currentWeb3.eth.getStorageAt(contract,slot_29_key_0);
    const slot_29_index_1 =  await currentWeb3.eth.getStorageAt(contract,slot_29_key_1);
    const slot_29_index_2 =  await currentWeb3.eth.getStorageAt(contract,slot_29_key_2);

    const slot_30_index_0 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_key_1);
    const slot_30_index_1 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_key_2);
    const slot_30_index_2 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_key_3);
    const slot_30_index_3 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_key_4);
    const slot_30_index_4 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_key_5);
    const slot_30_index_5 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_key_6);
    const slot_30_vartwo_index_0 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_keytwo_1);
    const slot_30_vartwo_index_1 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_keytwo_2);
    const slot_30_vartwo_index_2 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_keytwo_3);
    const slot_30_vartwo_index_3 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_keytwo_4);
    const slot_30_vartwo_index_4 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_keytwo_5);
    const slot_30_vartwo_index_5 =  await currentWeb3.eth.getStorageAt(contract,slot_30_slot_keytwo_6);

    const slot_31_index_0 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_1);
    const slot_31_index_1 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_2);
    const slot_31_index_2 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_3);
    const slot_31_index_3 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_4);
    const slot_31_index_4 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_5);
    const slot_31_index_5 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_6);
    const slot_31_index_6 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_7);
    const slot_31_index_7 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_8);
    const slot_31_index_8 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_9);
    const slot_31_index_9 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_10);
    const slot_31_index_10 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_11);
    const slot_31_index_11 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_key_12);
    const slot_31_vartwo_index_0 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_keytwo_1);
    const slot_31_vartwo_index_1 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_keytwo_2);
    const slot_31_vartwo_index_2 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_keytwo_3);
    const slot_31_vartwo_index_3 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_keytwo_4);
    const slot_31_vartwo_index_4 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_keytwo_5);
    const slot_31_vartwo_index_5 =  await currentWeb3.eth.getStorageAt(contract,slot_31_slot_keytwo_6);
    
    // string convert
    const slot_29_str = await currentWeb3.utils.toHex(slot_29_index_0);
    const slot_29_convert = await currentWeb3.utils.hexToAscii(slot_29_str);
    const slot_30_str = await currentWeb3.utils.toHex(slot_30_index_0);
    const slot_30_convert = await currentWeb3.utils.hexToAscii(slot_30_str);    
    const slot_30_str_2 = await currentWeb3.utils.toHex(slot_30_index_3);
    const slot_30_convert_2 = await currentWeb3.utils.hexToAscii(slot_30_str_2);  
    const slot_30_vartwo_str = await currentWeb3.utils.toHex(slot_30_vartwo_index_0);
    const slot_30_vartwo_convert = await currentWeb3.utils.hexToAscii(slot_30_vartwo_str);    
    const slot_30_vartwo_str_2 = await currentWeb3.utils.toHex(slot_30_vartwo_index_3);
    const slot_30_vartwo_convert_2 = await currentWeb3.utils.hexToAscii(slot_30_vartwo_str_2);  
    const slot_31_str = await currentWeb3.utils.toHex(slot_31_index_0);
    const slot_31_convert = await currentWeb3.utils.hexToAscii(slot_31_str);    
    const slot_31_str_2 = await currentWeb3.utils.toHex(slot_31_index_3);
    const slot_31_convert_2 = await currentWeb3.utils.hexToAscii(slot_31_str_2); 
    const slot_31_str_3 = await currentWeb3.utils.toHex(slot_31_index_6);
    const slot_31_convert_3 = await currentWeb3.utils.hexToAscii(slot_31_str_3); 
    const slot_31_str_4 = await currentWeb3.utils.toHex(slot_31_index_9);
    const slot_31_convert_4 = await currentWeb3.utils.hexToAscii(slot_31_str_4);  
    const slot_31_vartwo_str = await currentWeb3.utils.toHex(slot_31_vartwo_index_0);
    const slot_31_vartwo_convert = await currentWeb3.utils.hexToAscii(slot_31_vartwo_str);    
    const slot_31_vartwo_str_2 = await currentWeb3.utils.toHex(slot_31_vartwo_index_3);
    const slot_31_vartwo_convert_2 = await currentWeb3.utils.hexToAscii(slot_31_vartwo_str_2);    

    console.log("");
    console.log("slot_29_convert",slot_29_convert);
    console.log("slot_30_convert", slot_30_convert);
    console.log("slot_30_convert_2", slot_30_convert_2);
    console.log("slot_30_vartwo_convert", slot_30_vartwo_convert);
    console.log("slot_30_vartwo_convert_2", slot_30_vartwo_convert_2);
    console.log("slot_31_convert", slot_31_convert);
    console.log("slot_31_convert_2", slot_31_convert_2);
    console.log("slot_31_convert_3", slot_31_convert_3);
    console.log("slot_31_convert_4", slot_31_convert_4);
    console.log("slot_31_vartwo_convert", slot_31_vartwo_convert);
    console.log("slot_31_vartwo_convert_2", slot_31_vartwo_convert_2);
    console.log("Encoded-Array-Data",{
            "slot_29_index_1": await currentWeb3.eth.abi.decodeParameter('uint256', slot_29_index_1),
            "slot_29_index_2": await currentWeb3.eth.abi.decodeParameter('address', slot_29_index_2),
            "slot_30_index_1": await currentWeb3.eth.abi.decodeParameter('uint256', slot_30_index_1),
            "slot_30_index_2": await currentWeb3.eth.abi.decodeParameter('address', slot_30_index_2),
            "slot_30_index_4": await currentWeb3.eth.abi.decodeParameter('uint256', slot_30_index_4),
            "slot_30_index_5": await currentWeb3.eth.abi.decodeParameter('address', slot_30_index_5),
            "slot_30_vartwo_index_1": await currentWeb3.eth.abi.decodeParameter('uint256', slot_30_vartwo_index_1),
            "slot_30_vartwo_index_2": await currentWeb3.eth.abi.decodeParameter('address', slot_30_vartwo_index_2),
            "slot_30_vartwo_index_4": await currentWeb3.eth.abi.decodeParameter('uint256', slot_30_vartwo_index_4),
            "slot_30_vartwo_index_5": await currentWeb3.eth.abi.decodeParameter('address', slot_30_vartwo_index_5),
            "slot_31_index_1": await currentWeb3.eth.abi.decodeParameter('uint256', slot_31_index_1),
            "slot_31_index_2": await currentWeb3.eth.abi.decodeParameter('address', slot_31_index_2),
            "slot_31_index_4": await currentWeb3.eth.abi.decodeParameter('uint256', slot_31_index_4),
            "slot_31_index_5": await currentWeb3.eth.abi.decodeParameter('address', slot_31_index_5),
            "slot_31_index_7": await currentWeb3.eth.abi.decodeParameter('uint256', slot_31_index_7),
            "slot_31_index_8": await currentWeb3.eth.abi.decodeParameter('address', slot_31_index_8),
            "slot_31_index_10": await currentWeb3.eth.abi.decodeParameter('uint256', slot_31_index_10),
            "slot_31_index_11": await currentWeb3.eth.abi.decodeParameter('address', slot_31_index_11),
            "slot_31_vartwo_index_1": await currentWeb3.eth.abi.decodeParameter('uint256', slot_31_vartwo_index_1),
            "slot_31_vartwo_index_2": await currentWeb3.eth.abi.decodeParameter('address', slot_31_vartwo_index_2),
            "slot_31_vartwo_index_4": await currentWeb3.eth.abi.decodeParameter('uint256', slot_31_vartwo_index_4),
            "slot_31_vartwo_index_5": await currentWeb3.eth.abi.decodeParameter('address', slot_31_vartwo_index_5),
    });
    console.log("");
    console.log("");

    console.log("");
    console.log("");

    let slot_32_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(32));
    let slot_32_key_1 = await currentWeb3.utils.soliditySha3(getBytes32(5),getBytes32(slot_32_hash_1));
    let slot_32_key_2 = await currentWeb3.utils.soliditySha3(getBytes32(4),getBytes32(slot_32_hash_1));


    let slot_33_hash_1 = await currentWeb3.utils.soliditySha3(getBytes32(address_one),getBytes32(33));
    let slot_33_key_1 = await currentWeb3.utils.soliditySha3(getBytes32(444),getBytes32(slot_33_hash_1));
    let slot_33_slot = await currentWeb3.utils.soliditySha3(getBytes32(slot_33_key_1));

    const slot_32_slot_key_1_value_0 =  await currentWeb3.utils.numberToHex(new BN(slot_32_key_1).add(new BN(0))); 
    const slot_32_slot_key_1_value_1 =  await currentWeb3.utils.numberToHex(new BN(slot_32_key_1).add(new BN(1)));  
    const slot_32_slot_key_1_value_2 =  await currentWeb3.utils.numberToHex(new BN(slot_32_key_1).add(new BN(2)));
    const slot_32_slot_key_1_value_3 =  await currentWeb3.utils.numberToHex(new BN(slot_32_key_2).add(new BN(0))); 
    const slot_32_slot_key_1_value_4 =  await currentWeb3.utils.numberToHex(new BN(slot_32_key_2).add(new BN(1)));  
    const slot_32_slot_key_1_value_5 =  await currentWeb3.utils.numberToHex(new BN(slot_32_key_2).add(new BN(2)));      
    
    const slot_33_slot_key_1_value_0 =  await currentWeb3.utils.numberToHex(new BN(slot_33_slot).add(new BN(0))); 
    const slot_33_slot_key_1_value_1 =  await currentWeb3.utils.numberToHex(new BN(slot_33_slot).add(new BN(1)));  
    const slot_33_slot_key_1_value_2 =  await currentWeb3.utils.numberToHex(new BN(slot_33_slot).add(new BN(2)));   

    const slot_32_value_0 =  await currentWeb3.eth.getStorageAt(contract,slot_32_slot_key_1_value_0);
    const slot_32_value_1 =  await currentWeb3.eth.getStorageAt(contract,slot_32_slot_key_1_value_1);
    const slot_32_value_2 =  await currentWeb3.eth.getStorageAt(contract,slot_32_slot_key_1_value_2);
    const slot_32_value_3 =  await currentWeb3.eth.getStorageAt(contract,slot_32_slot_key_1_value_3);
    const slot_32_value_4 =  await currentWeb3.eth.getStorageAt(contract,slot_32_slot_key_1_value_4);
    const slot_32_value_5 =  await currentWeb3.eth.getStorageAt(contract,slot_32_slot_key_1_value_5);


    const slot_33_value_0 =  await currentWeb3.eth.getStorageAt(contract,slot_33_slot_key_1_value_0);
    const slot_33_value_1 =  await currentWeb3.eth.getStorageAt(contract,slot_33_slot_key_1_value_1);
    const slot_33_value_2 =  await currentWeb3.eth.getStorageAt(contract,slot_33_slot_key_1_value_2);


    // string convert
    const slot_32_str_0 = await currentWeb3.utils.toHex(slot_32_value_0);
    const slot_32_convert_0 = await currentWeb3.utils.hexToAscii(slot_32_str_0);
    const slot_32_str_1 = await currentWeb3.utils.toHex(slot_32_value_3);
    const slot_32_convert_1 = await currentWeb3.utils.hexToAscii(slot_32_str_1);
    const slot_33_str_0 = await currentWeb3.utils.toHex(slot_33_value_0);
    const slot_33_convert_0 = await currentWeb3.utils.hexToAscii(slot_33_str_0);

    console.log("");
    console.log("slot_32_convert_0",slot_32_convert_0);
    console.log("slot_32_convert_1",slot_32_convert_1);
    console.log("slot_33_convert_0",slot_33_convert_0);
    console.log("Encoded-DoubleMap-Struct-Data",{
         "slot_32_value_1": await currentWeb3.eth.abi.decodeParameter('uint256', slot_32_value_1),
         "slot_32_value_2": await currentWeb3.eth.abi.decodeParameter('address', slot_32_value_2),
         "slot_32_value_4": await currentWeb3.eth.abi.decodeParameter('uint256', slot_32_value_4),
         "slot_32_value_5": await currentWeb3.eth.abi.decodeParameter('address', slot_32_value_5),
         "slot_33_value_1": await currentWeb3.eth.abi.decodeParameter('uint256', slot_33_value_1),
         "slot_33_value_2": await currentWeb3.eth.abi.decodeParameter('address', slot_33_value_2),
    });
    console.log("");
    console.log("");
})();

