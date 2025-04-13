<template>
  <div>
   
    <!-- Search Input -->
    <input
      v-model="search"
      type="text"
      placeholder="Search..."
      class="border p-2 mb-4 w-full rounded"
    />

    <!-- Table -->
    <div class="overflow-auto">
      <table class="min-w-full table-auto border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th @click="sortBy('state')" class="px-4 py-2 cursor-pointer">State/Territory</th>
            <th @click="sortBy('currency')" class="px-4 py-2 cursor-pointer">Currency</th>
            <th class="px-4 py-2">Symbol</th>
            <th class="px-4 py-2">ISO Code</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in filteredAndSorted"
            :key="index"
            class="border-t"
          >
            <td class="px-4 py-2">{{ item.state }}</td>
            <td class="px-4 py-2">{{ item.currency }}</td>
            <td class="px-4 py-2">{{ item.symbol }}</td>
            <td class="px-4 py-2">{{ item.iso }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'


// Search input and sorting logic
const search = ref('')
const sortKey = ref('state')
const sortAsc = ref(true)

function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}
// Load your currency data (partial for brevity — you’ll load full in real use)
const data = ref([
     { state: 'Afghanistan', currency: 'Afghan afghani', symbol: '؋', iso: 'AFN' },
        { state: 'Albania', currency: 'Albanian lek', symbol: 'L', iso: 'ALL' },
        { state: 'Algeria', currency: 'Algerian dinar', symbol: 'د.ج', iso: 'DZD' },
        { state: 'Andorra', currency: 'Euro', symbol: '€', iso: 'EUR' },
        { state: 'Angola', currency: 'Angolan kwanza', symbol: 'Kz', iso: 'AOA' },
        { state: 'Antigua and Barbuda', currency: 'East Caribbean dollar', symbol: '$', iso: 'XCD' },
        { state: 'Argentina', currency: 'Argentine peso', symbol: '$', iso: 'ARS' },
        { state: 'Armenia', currency: 'Armenian dram', symbol: 'դր.', iso: 'AMD' },
        { state: 'Australia', currency: 'Australian dollar', symbol: '$', iso: 'AUD' },
        { state: 'Austria', currency: 'Euro', symbol: '€', iso: 'EUR' },
        { state: 'Azerbaijan', currency: 'Azerbaijani manat', symbol: '₼', iso: 'AZN' },
        { state: 'Bahamas', currency: 'Bahamian dollar', symbol: '$', iso: 'BSD' },
        { state: 'Bahrain', currency: 'Bahraini dinar', symbol: '.د.ب', iso: 'BHD' },
        { state: 'Bangladesh', currency: 'Bangladeshi taka', symbol: '৳', iso: 'BDT' },
        { state: 'Barbados', currency: 'Barbadian dollar', symbol: '$', iso: 'BBD' },
        { state: 'Belarus', currency: 'Belarusian ruble', symbol: 'BYN', iso: 'BYN' },
        { state: 'Belgium', currency: 'Euro', symbol: '€', iso: 'EUR' },
        { state: 'Belize', currency: 'Belize dollar', symbol: '$', iso: 'BZD' },
        { state: 'Benin', currency: 'West African CFA franc', symbol: '₣', iso: 'XOF' },
        { state: 'Bhutan', currency: 'Bhutanese ngultrum', symbol: 'Nu.', iso: 'BTN' },
        { state: 'Bolivia', currency: 'Bolivian boliviano', symbol: 'Bs.', iso: 'BOB' },
        { state: 'Bosnia and Herzegovina', currency: 'Bosnia and Herzegovina convertible mark', symbol: 'KM', iso: 'BAM' },
        { state: 'Botswana', currency: 'Botswana pula', symbol: 'P', iso: 'BWP' },
        { state: 'Brazil', currency: 'Brazilian real', symbol: 'R$', iso: 'BRL' },
        { state: 'Brunei', currency: 'Brunei dollar', symbol: '$', iso: 'BND' },
        { state: 'Bulgaria', currency: 'Bulgarian lev', symbol: 'лв', iso: 'BGN' },
        { state: 'Burkina Faso', currency: 'West African CFA franc', symbol: '₣', iso: 'XOF' },
        { state: 'Burundi', currency: 'Burundian franc', symbol: 'Fr', iso: 'BIF' },
        { state: 'Cabo Verde', currency: 'Cape Verdean escudo', symbol: '$', iso: 'CVE' },
        { state: 'Cambodia', currency: 'Cambodian riel', symbol: '៛', iso: 'KHR' },
        { state: 'Cameroon', currency: 'Central African CFA franc', symbol: '₣', iso: 'CFA' },
        { state: 'Canada', currency: 'Canadian dollar', symbol: '$', iso: 'CAD' },
        { state: 'Central African Republic', currency: 'Central African CFA franc', symbol: '₣', iso: 'CAF' },
        { state: 'Chad', currency: 'Central African CFA franc', symbol: '₣', iso: 'TCD' },
        { state: 'Chile', currency: 'Chilean peso', symbol: '$', iso: 'CLP' },
        { state: 'China', currency: 'Renminbi', symbol: '¥', iso: 'CNY' },
        { state: 'Colombia', currency: 'Colombian peso', symbol: '$', iso: 'COP' },
        { state: 'Comoros', currency: 'Comorian franc', symbol: 'KMF', iso: 'COM' },
        { state: 'Congo (Congo-Brazzaville)', currency: 'Central African CFA franc', symbol: '₣', iso: 'COG' },
        { state: 'Congo (Democratic Republic of the Congo)', currency: 'Congolese franc', symbol: 'FC', iso: 'COD' },
        { state: 'Costa Rica', currency: 'Costa Rican colón', symbol: '₡', iso: 'CRC' },
        { state: 'Croatia', currency: 'Croatian kuna', symbol: 'kn', iso: 'HRK' },
        { state: 'Cuba', currency: 'Cuban peso', symbol: '$', iso: 'CUP' },
        { state: 'Cyprus', currency: 'Euro', symbol: '€', iso: 'CY' },
        { state: 'Czech Republic', currency: 'Czech koruna', symbol: 'Kč', iso: 'CZK' },
        { state: 'Denmark', currency: 'Danish krone', symbol: 'kr', iso: 'DKK' },
        { state: 'Djibouti', currency: 'Djiboutian franc', symbol: 'Fdj', iso: 'DJF' },
        { state: 'Dominica', currency: 'East Caribbean dollar', symbol: '$', iso: 'XCD' },
        { state: 'Dominican Republic', currency: 'Dominican peso', symbol: 'RD$', iso: 'DOP' },
        { state: 'Ecuador', currency: 'United States dollar', symbol: '$', iso: 'USD' },
        { state: 'Egypt', currency: 'Egyptian pound', symbol: '£', iso: 'EGP' },
        { state: 'El Salvador', currency: 'United States dollar', symbol: '$', iso: 'USD' },
        { state: 'Equatorial Guinea', currency: 'Central African CFA franc', symbol: '₣', iso: 'GNF' },
        { state: 'Eritrea', currency: 'Eritrean nakfa', symbol: 'Nkf', iso: 'ERN' },
        { state: 'Estonia', currency: 'Euro', symbol: '€', iso: 'EUR' },
        { state: 'Eswatini', currency: 'Swazi lilangeni', symbol: 'E', iso: 'SZL' },
        { state: 'Ethiopia', currency: 'Ethiopian birr', symbol: 'ብር', iso: 'ETB' },
        { state: 'Fiji', currency: 'Fijian dollar', symbol: '$', iso: 'FJD' },
        { state: 'Finland', currency: 'Euro', symbol: '€', iso: 'EUR' },
        { state: 'France', currency: 'Euro', symbol: '€', iso: 'EUR' },
        { state: 'Gabon', currency: 'Central African CFA franc', symbol: '₣', iso: 'GAB' },
        { state: 'Gambia', currency: 'Gambian dalasi', symbol: 'D', iso: 'GMD' },
        { state: 'Georgia', currency: 'Georgian lari', symbol: '₾', iso: 'GEL' },
        { state: 'Germany', currency: 'Euro', symbol: '€', iso: 'DEU' },
        { state: 'Ghana', currency: 'Ghanaian cedi', symbol: '₵', iso: 'GHS' },
        { state: 'Greece', currency: 'Euro', symbol: '€', iso: 'GRC' },
        { state: 'Grenada', currency: 'East Caribbean dollar', symbol: '$', iso: 'XCD' },
        { state: 'Guatemala', currency: 'Guatemalan quetzal', symbol: 'Q', iso: 'GTM' },
        { state: 'Guinea', currency: 'Guinean franc', symbol: 'GNF', iso: 'GIN' },
        { state: 'Guinea-Bissau', currency: 'West African CFA franc', symbol: '₣', iso: 'GNB' },
        { state: 'Guyana', currency: 'Guyanese dollar', symbol: '$', iso: 'GUY' },
        { state: 'Haiti', currency: 'Haitian gourde', symbol: 'G', iso: 'HTG' },
        { state: 'Honduras', currency: 'Honduran lempira', symbol: 'L', iso: 'HND' },
        { state: 'Hungary', currency: 'Hungarian forint', symbol: 'Ft', iso: 'HUF' },
        { state: 'Iceland', currency: 'Icelandic króna', symbol: 'kr', iso: 'ISK' },
        { state: 'India', currency: 'Indian rupee', symbol: '₹', iso: 'INR' },
        { state: 'Indonesia', currency: 'Indonesian rupiah', symbol: 'Rp', iso: 'IDR' },
        { state: 'Iran', currency: 'Iranian rial', symbol: '﷼', iso: 'IRR' },
        { state: 'Iraq', currency: 'Iraqi dinar', symbol: 'د.ع', iso: 'IRQ' },
        { state: 'Ireland', currency: 'Euro', symbol: '€', iso: 'IRL' },
        { state: 'Israel', currency: 'Israeli new shekel', symbol: '₪', iso: 'ILS' },
        { state: 'Italy', currency: 'Euro', symbol: '€', iso: 'ITA' },
        { state: 'Jamaica', currency: 'Jamaican dollar', symbol: '$', iso: 'JAM' },
        { state: 'Japan', currency: 'Japanese yen', symbol: '¥', iso: 'JPY' },
        { state: 'Jordan', currency: 'Jordanian dinar', symbol: 'د.ا', iso: 'JOR' },
        { state: 'Kazakhstan', currency: 'Kazakhstani tenge', symbol: '₸', iso: 'KAZ' },
        { state: 'Kenya', currency: 'Kenyan shilling', symbol: 'KSh', iso: 'KEN' },
        { state: 'Kiribati', currency: 'Australian dollar', symbol: '$', iso: 'AUS' },
        { state: 'Korea (North)', currency: 'North Korean won', symbol: '₩', iso: 'PRK' },
        { state: 'Korea (South)', currency: 'South Korean won', symbol: '₩', iso: 'KOR' },
        { state: 'Kuwait', currency: 'Kuwaiti dinar', symbol: 'د.ك', iso: 'KWT' },
        { state: 'Kyrgyzstan', currency: 'Kyrgyzstani som', symbol: 'с', iso: 'KGZ' },
        { state: 'Laos', currency: 'Lao kip', symbol: '₭', iso: 'LAO' },
        { state: 'Latvia', currency: 'Euro', symbol: '€', iso: 'LVA' },
        { state: 'Lebanon', currency: 'Lebanese pound', symbol: 'ل.ل', iso: 'LBN' },
        { state: 'Lesotho', currency: 'Lesotho loti', symbol: 'L', iso: 'LSO' },
        { state: 'Liberia', currency: 'Liberian dollar', symbol: '$', iso: 'LBR' },
        { state: 'Libya', currency: 'Libyan dinar', symbol: 'د.ل', iso: 'LBY' },
        { state: 'Liechtenstein', currency: 'Swiss franc', symbol: 'CHF', iso: 'LIE' },
        { state: 'Lithuania', currency: 'Euro', symbol: '€', iso: 'LTU' },
        { state: 'Luxembourg', currency: 'Euro', symbol: '€', iso: 'LUX' },
        { state: 'Madagascar', currency: 'Malagasy ariary', symbol: 'Ar', iso: 'MDG' },
        { state: 'Malawi', currency: 'Malawian kwacha', symbol: 'MK', iso: 'MWI' },
        { state: 'Malaysia', currency: 'Malaysian ringgit', symbol: 'RM', iso: 'MYS' },
        { state: 'Maldives', currency: 'Maldivian rufiyaa', symbol: 'Rf', iso: 'MDV' },
        { state: 'Mali', currency: 'West African CFA franc', symbol: '₣', iso: 'MLI' },
        { state: 'Malta', currency: 'Euro', symbol: '€', iso: 'MLT' },
        { state: 'Marshall Islands', currency: 'United States dollar', symbol: '$', iso: 'MHL' },
        { state: 'Mauritania', currency: 'Mauritanian ouguiya', symbol: 'UM', iso: 'MRT' },
        { state: 'Mauritius', currency: 'Mauritian rupee', symbol: '₨', iso: 'MUS' },
        { state: 'Mexico', currency: 'Mexican peso', symbol: '$', iso: 'MEX' },
        { state: 'Micronesia', currency: 'United States dollar', symbol: '$', iso: 'FSM' },
        { state: 'Moldova', currency: 'Moldovan leu', symbol: 'lei', iso: 'MDA' },
        { state: 'Monaco', currency: 'Euro', symbol: '€', iso: 'MCO' },
        { state: 'Mongolia', currency: 'Mongolian tögrög', symbol: '₮', iso: 'MNG' },
        { state: 'Montenegro', currency: 'Euro', symbol: '€', iso: 'MNE' },
        { state: 'Morocco', currency: 'Moroccan dirham', symbol: 'د.م.', iso: 'MAR' },
        { state: 'Mozambique', currency: 'Mozambican metical', symbol: 'MT', iso: 'MOZ' },
        { state: 'Myanmar', currency: 'Burmese kyat', symbol: 'Ks', iso: 'MMR' },
        { state: 'Namibia', currency: 'Namibian dollar', symbol: '$', iso: 'NAM' },
        { state: 'Nauru', currency: 'Australian dollar', symbol: '$', iso: 'AUS' },
        { state: 'Nepal', currency: 'Nepalese rupee', symbol: '₨', iso: 'NPL' },
        { state: 'Netherlands', currency: 'Euro', symbol: '€', iso: 'NLD' },
        { state: 'New Zealand', currency: 'New Zealand dollar', symbol: '$', iso: 'NZD' },
        { state: 'Nicaragua', currency: 'Nicaraguan córdoba', symbol: 'C$', iso: 'NIC' },
        { state: 'Niger', currency: 'West African CFA franc', symbol: '₣', iso: 'NER' },
        { state: 'Nigeria', currency: 'Nigerian naira', symbol: '₦', iso: 'NGA' },
        { state: 'North Macedonia', currency: 'Macedonian denar', symbol: 'ден', iso: 'MKD' },
        { state: 'Norway', currency: 'Norwegian krone', symbol: 'kr', iso: 'NOR' },
        { state: 'Oman', currency: 'Omani rial', symbol: 'ر.ع.', iso: 'OMN' },
        { state: 'Pakistan', currency: 'Pakistani rupee', symbol: '₨', iso: 'PAK' },
        { state: 'Palau', currency: 'United States dollar', symbol: '$', iso: 'PLW' },
        { state: 'Panama', currency: 'Balboa', symbol: 'B/.', iso: 'PAN' },
        { state: 'Papua New Guinea', currency: 'Kina', symbol: 'K', iso: 'PNG' },
        { state: 'Paraguay', currency: 'Paraguayan guarani', symbol: '₲', iso: 'PRY' },
        { state: 'Peru', currency: 'Sol', symbol: 'S/', iso: 'PER' },
        { state: 'Philippines', currency: 'Philippine peso', symbol: '₱', iso: 'PHL' },
        { state: 'Poland', currency: 'Polish złoty', symbol: 'zł', iso: 'POL' },
        { state: 'Portugal', currency: 'Euro', symbol: '€', iso: 'PRT' },
        { state: 'Qatar', currency: 'Qatari riyal', symbol: 'ر.ق', iso: 'QAT' },
        { state: 'Romania', currency: 'Romanian leu', symbol: 'lei', iso: 'ROU' },
        { state: 'Russia', currency: 'Russian ruble', symbol: '₽', iso: 'RUS' },
        { state: 'Rwanda', currency: 'Rwandan franc', symbol: 'Fr', iso: 'RWA' },
        { state: 'Saint Kitts and Nevis', currency: 'Eastern Caribbean dollar', symbol: '$', iso: 'KNA' },
        { state: 'Saint Lucia', currency: 'Eastern Caribbean dollar', symbol: '$', iso: 'LCA' },
        { state: 'Saint Vincent and the Grenadines', currency: 'Eastern Caribbean dollar', symbol: '$', iso: 'VCT' },
        { state: 'Samoa', currency: 'Tala', symbol: 'T', iso: 'WSM' },
        { state: 'San Marino', currency: 'Euro', symbol: '€', iso: 'SMR' },
        { state: 'Sao Tome and Principe', currency: 'Dobra', symbol: 'Db', iso: 'STP' },
        { state: 'Saudi Arabia', currency: 'Saudi riyal', symbol: 'ر.س', iso: 'SAU' },
        { state: 'Senegal', currency: 'West African CFA franc', symbol: '₣', iso: 'SEN' },
        { state: 'Serbia', currency: 'Serbian dinar', symbol: 'РСД', iso: 'SRB' },
        { state: 'Seychelles', currency: 'Seychellois rupee', symbol: '₨', iso: 'SYC' },
        { state: 'Sierra Leone', currency: 'Leone', symbol: 'Le', iso: 'SLE' },
        { state: 'Singapore', currency: 'Singapore dollar', symbol: '$', iso: 'SGP' },
        { state: 'Slovakia', currency: 'Euro', symbol: '€', iso: 'SVK' },
        { state: 'Slovenia', currency: 'Euro', symbol: '€', iso: 'SVN' },
        { state: 'Solomon Islands', currency: 'Solomon Islands dollar', symbol: '$', iso: 'SLB' },
        { state: 'Somalia', currency: 'Somali shilling', symbol: 'Sh', iso: 'SOM' },
        { state: 'South Africa', currency: 'South African rand', symbol: 'R', iso: 'ZAF' },
        { state: 'South Sudan', currency: 'South Sudanese pound', symbol: '£', iso: 'SSD' },
        { state: 'Spain', currency: 'Euro', symbol: '€', iso: 'ESP' },
        { state: 'Sri Lanka', currency: 'Sri Lankan rupee', symbol: 'Rs', iso: 'LKA' },
        { state: 'Sudan', currency: 'Sudanese pound', symbol: '£', iso: 'SDN' },
        { state: 'Suriname', currency: 'Surinamese dollar', symbol: '$', iso: 'SUR' },
        { state: 'Sweden', currency: 'Swedish krona', symbol: 'kr', iso: 'SWE' },
        { state: 'Switzerland', currency: 'Swiss franc', symbol: 'CHF', iso: 'CHE' },
        { state: 'Syria', currency: 'Syrian pound', symbol: '£', iso: 'SYR' },
        { state: 'Taiwan', currency: 'New Taiwan dollar', symbol: 'NT$', iso: 'TWN' },
        { state: 'Tajikistan', currency: 'Tajikistani somoni', symbol: 'ЅМ', iso: 'TJK' },
        { state: 'Tanzania', currency: 'Tanzanian shilling', symbol: 'TSh', iso: 'TZA' },
        { state: 'Thailand', currency: 'Thai baht', symbol: '฿', iso: 'THA' },
        { state: 'Timor-Leste', currency: 'United States dollar', symbol: '$', iso: 'TLS' },
        { state: 'Togo', currency: 'West African CFA franc', symbol: '₣', iso: 'TGO' },
        { state: 'Tonga', currency: 'Paʻanga', symbol: 'T$', iso: 'TON' },
        { state: 'Trinidad and Tobago', currency: 'Trinidad and Tobago dollar', symbol: '$', iso: 'TTO' },
        { state: 'Tunisia', currency: 'Tunisian dinar', symbol: 'د.ت', iso: 'TUN' },
        { state: 'Turkey', currency: 'Turkish lira', symbol: '₺', iso: 'TUR' },
        { state: 'Turkmenistan', currency: 'Manat', symbol: 'm', iso: 'TKM' },
        { state: 'Tuvalu', currency: 'Australian dollar', symbol: '$', iso: 'AUS' },
        { state: 'Uganda', currency: 'Ugandan shilling', symbol: 'USh', iso: 'UGA' },
        { state: 'Ukraine', currency: 'Ukrainian hryvnia', symbol: '₴', iso: 'UKR' },
        { state: 'United Arab Emirates', currency: 'UAE dirham', symbol: 'د.إ', iso: 'ARE' },
        { state: 'United Kingdom', currency: 'Pound sterling', symbol: '£', iso: 'GBR' },
        { state: 'United States', currency: 'United States dollar', symbol: '$', iso: 'USD' },
        { state: 'Uruguay', currency: 'Uruguayan peso', symbol: '$', iso: 'URY' },
        { state: 'Uzbekistan', currency: 'Uzbekistani som', symbol: 'so\'m', iso: 'UZB' },
        { state: 'Vanuatu', currency: 'Vanuatu vatu', symbol: 'Vt', iso: 'VUT' },
        { state: 'Vatican City', currency: 'Euro', symbol: '€', iso: 'VAT' },
        { state: 'Venezuela', currency: 'Venezuelan bolívar', symbol: 'Bs.S.', iso: 'VEN' },
        { state: 'Vietnam', currency: 'Vietnamese đồng', symbol: '₫', iso: 'VNM' },
        { state: 'Yemen', currency: 'Yemeni rial', symbol: '﷼', iso: 'YEM' },
        { state: 'Zambia', currency: 'Zambian kwacha', symbol: 'ZK', iso: 'ZMB' },
        { state: 'Zimbabwe', currency: 'Zimbabwean dollar', symbol: '$', iso: 'ZWE' }
      
])

const filteredAndSorted = computed(() => {
  let filtered = data.value.filter(item =>
    item.state.toLowerCase().includes(search.value.toLowerCase()) ||
    item.currency.toLowerCase().includes(search.value.toLowerCase()) ||
    item.symbol.toLowerCase().includes(search.value.toLowerCase()) ||
    item.iso.toLowerCase().includes(search.value.toLowerCase())
  )

  return filtered.sort((a, b) => {
    const aVal = a[sortKey.value].toLowerCase()
    const bVal = b[sortKey.value].toLowerCase()

    if (aVal < bVal) return sortAsc.value ? -1 : 1
    if (aVal > bVal) return sortAsc.value ? 1 : -1
    return 0
  })
})
</script>

<style scoped>

/* General Styles */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #fff;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}

.container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateY(10px);
  animation: fadeIn 1s ease-in-out;
}

/* Keyframe animation for fade-in effect */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Input Styling */
input[type="text"] {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border-radius: 25px;
  border: 2px solid #ddd;
  background-color: #f7f7f7;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  outline: none;
}

input[type="text"]:focus {
  border-color: #2575fc;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(37, 117, 252, 0.4);
  transform: scale(1.03);
}

/* Table Styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 18px 24px;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

th {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  border-bottom: 3px solid #ddd;
  transition: background 0.3s ease;
}

th:hover {
  background: #5c5dff;
  transform: translateY(-3px);
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #e3e3e3;
  cursor: pointer;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

td {
  border-top: 1px solid #f1f1f1;
}

table td {
  font-size: 15px;
}

/* Hover Effects */
tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
  transform: translateY(-3px);
}

th {
  cursor: pointer;
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  color: #fff;
  padding: 18px 24px;
  text-align: left;
  border-bottom: 3px solid #ddd;
}
/* Input Styling for Search Bar */
input[type="text"] {
  width: 100%;
  padding: 8px; /* Reduced padding for a smaller search bar */
  font-size: 14px; /* Slightly smaller font size */
  border-radius: 25px;
  border: 2px solid #ddd;
  background-color: #f7f7f7;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  outline: none;
}

input[type="text"]:focus {
  border-color: #2575fc;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(37, 117, 252, 0.4);
  transform: scale(1.03);
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .container {
    padding: 20px;
  }

  input[type="text"] {
    padding: 14px;
    font-size: 14px;
  }

  table {
    font-size: 14px;
  }

  th, td {
    padding: 14px;
  }

  input[type="button"], input[type="submit"] {
    padding: 10px 16px;
    font-size: 14px;
  }
}


</style>
