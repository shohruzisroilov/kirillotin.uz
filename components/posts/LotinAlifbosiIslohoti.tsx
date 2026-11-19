import Link from "next/link";

export function LotinAlifbosiIslohoti() {
  return (
    <>
      <p>
        Ўзбекистонда лотин ёзувига асосланган ўзбек алифбосини ислоҳ қилиш ва
        такомиллаштириш масаласи бир неча йилдан буён жамоатчилик, тилшунослар ва
        давлат идоралари томонидан энг кўп муҳокама қилинаётган долзарб мавзулардан
        бири ҳисобланади. Ушбу мақолада алифбода кутилаётган асосий ўзгаришлар,
        уларнинг сабаблари ва рақамли келажакка таъсири ҳақида батафсил тўхталамиз.
      </p>

      <h2>Нима учун янги ислоҳот зарур бўлди?</h2>
      <p>
        1995 йилда қабул қилинган амалдаги ўзбек лотин алифбосида бир қатор
        техник ва имловий ноқулайликлар мавжуд:
      </p>
      <ul>
        <li>
          <strong>Апостроф ва очиқ тирноқлар:</strong> <code>Oʻ</code> ва{" "}
          <code>Gʻ</code> ҳарфларини ёзишда махсус белги (<code>ʻ</code>) талаб
          қилинади. Аксарият одамлар бунинг ўрнига оддий апостроф (<code>&apos;</code>),
          гравис (<code>`</code>) ёки бошқа белгиларни қўллайди. Натижада битта сўз
          интернетда турлича ёзилиб, қидирув тизимларида муаммо туғдиради.
        </li>
        <li>
          <strong>Қўшҳарфлар (диграфлар):</strong> <code>Sh</code> ва{" "}
          <code>Ch</code> ҳарфлари иккита белгидан иборат. Бу баъзан сўз маъносини
          нотўғри тушунишга олиб келади (масалан, <em>Исҳоқ</em> сўзида <em>s</em>{" "}
          ва <em>h</em> ёнма-ён келганида <em>sh</em> каби ўқилиши хавфи).
        </li>
        <li>
          <strong>Матн ҳажми ва кўз чарчаши:</strong> Диграфлар ва қўшимча
          белгилар туфайли китоблар ва расмий ҳужжатлар ҳажми кириллча нусхасига
          нисбатан 15-20% кўпроқ жой эгаллайди.
        </li>
      </ul>

      <h2>Лойиҳада қандай ҳарфлар таклиф этилмоқда?</h2>
      <p>
        Тилшунос олимлар ва Олий Мажлис ишчи гуруҳи томонидан ишлаб чиқилган янги
        лойиҳада асосан 4 та ҳарфни ихчамлаштириш кўзда тутилган:
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse border border-gray-200 dark:border-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-left">
              <th className="p-3 border border-gray-200 dark:border-gray-800">Кирилл</th>
              <th className="p-3 border border-gray-200 dark:border-gray-800">Ҳозирги лотин</th>
              <th className="p-3 border border-gray-200 dark:border-gray-800">Янги таклиф</th>
              <th className="p-3 border border-gray-200 dark:border-gray-800">Изоҳ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Ў ў</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800">Oʻ oʻ</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800 font-bold text-primary-600 dark:text-primary-400">Ö ö</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800">Битта белгилик тўлиқ диакритик ҳарф</td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Ғ ғ</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800">Gʻ gʻ</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800 font-bold text-primary-600 dark:text-primary-400">Ğ ğ</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800">Бошқа туркий алифболар билан бир хиллик</td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Ш ш</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800">Sh sh</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800 font-bold text-primary-600 dark:text-primary-400">Ş ş</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800">Седелкали ихчам шакл</td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-200 dark:border-gray-800 font-bold">Ч ч</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800">Ch ch</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800 font-bold text-primary-600 dark:text-primary-400">Ç ç</td>
              <td className="p-3 border border-gray-200 dark:border-gray-800">Халқаро стандартларга мос</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Рақамли тизимлар ва клавиатуралар қандай мослашади?</h2>
      <p>
        Алифбонинг янги шакли қабул қилинса, энг асосий вазифа ахборот
        технологиялари ва гаджетларни унга мослаштириш бўлади:
      </p>
      <ul>
        <li>
          <strong>Смартфонлар:</strong> Google (Gboard) ва Apple (iOS) тизимлари
          allaqachon <code>Ş</code>, <code>Ç</code>, <code>Ğ</code> ва{" "}
          <code>Õ</code> белгиларини қулай киритишни таъминлаган.
        </li>
        <li>
          <strong>Компьютер клавиатуралари:</strong> Миллий клавиатура драйвери
          орқали ҳарфлар алоҳида тугмаларга ёки <em>AltGr</em> комбинациясига
          боғланади.
        </li>
        <li>
          <strong>Эски матнларни автоматик конвертация қилиш:</strong> Миллионлаб
          ҳужжат ва китобларни қўлда ўзгартириш имконсиз. Бунда айнан онлайн
          конверторлар ҳал қилувчи ўрин тутади.
        </li>
      </ul>

      <h2>Хулоса ва Kirillotin.uz позицияси</h2>
      <p>
        Янги алифбо лойиҳаси расман қонуний кучга киргунча, ҳозирги амалдаги 1995 йил
        қоидалари расмий ҳисобланади. Бироқ, келажакдаги ўзгаришларга тайёр бўлиш
        муҳим.
      </p>
      <p>
        <Link href="/">Kirillotin.uz</Link> миллий лойиҳаси сифатида давлат
        томонидан янги алифбо тасдиқланиши биланоқ барча функцияларни янги
        стандартга тезкорлик билан мослаштириб боради. Ҳозирча эса сайтимиз орқали
        кирил ва амалдаги лотин матнларингизни 99% аниқликда бир лаҳзада конвертация
        қилишингиз мумкин.
      </p>
    </>
  );
}
