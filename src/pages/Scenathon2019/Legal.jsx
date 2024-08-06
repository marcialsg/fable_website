import React from 'react';
import '../../css/index.css';
import BannerTitle from '../../components/BannerTitle';
import styled from 'styled-components';

const Styles = styled.div`
    span{
        cursor: pointer;
    }
`;
const Legal = () => {
    return (
        <>
            <BannerTitle title="Legal Notice" />
            <Styles>
                <div className="main-content">
                    <div>

                        <h3><b>Section Four</b></h3>
                        <h4>
                            <span onClick={() => { window.scrollTo(0, 590); }}>Imprint</span>,
                            <span onClick={() => { window.scrollTo(0, 1100); }}> disclosure</span>
                            <span onClick={() => { window.scrollTo(0, 2240); }}> and identification</span>
                        </h4>
                        <br />

                        <h4><b>Imprint</b></h4>
                        <p>§ 24. (1) Each media product shall indicate the name or the company of the media owner and of the producer as well as the business place of the publishing house and of the producer.</p>
                        <p>(2) Each periodical media product shall further indicate the address of the media owner and of the editors’ department of the media undertaking as well as the name and address of the publisher. In case media product contains a table of contents, such table shall also indicate where the imprint can be found.</p>
                        <p>(3) Each periodic electronic medium must indicate the name or the company as well as the address of media owner and publisher.</p>
                        <p>(4) The media owner is liable for the publication of the notice. If the media owner is only a provider of services in terms of § 3 sub-para 2 ECG (Electronic Commerce Act), Federal Law Gazette I No. 152/2001, the information on the imprint can be made available together with the information pursuant to § 5 Electronic Commerce Act.</p>
                        <p>(5) The information on the publisher pursuant to § 1172 f ABGB (General Civil Code of Austria) may be added to the imprint.</p>

                        <br />

                        <h4><b>Disclosure</b></h4>
                        <p>§ 25. (1) The media owner of each periodical media product shall publish the information stated in paras 2 through 4. In the case of periodical media products the imprint shall also include information as to the web address at which the information will, on a constant basis, be easily and directly retrievable, or such information shall be added in the relevant medium. For broadcast programmes all above information shall either be constantly available on an easily retrievable teletext page or be published in the Official Gazette of “Wiener Zeitung” within one month after the broadcast starts and within the first month of each calendar year. In the case of periodically published electronic media the information shall either state under which web address the information will be constantly easily and directly retrievable, or such information shall always be added in the respective medium. If the media owner is a provider of services in terms of § 3 para 2 Electronic Commerce Act, promulgated in Federal Law Gazette I No. 152/2001, the information for disclosure can be made available together with the information pursuant § 5 Electronic Commerce Act.</p>
                        <p>(2) The media owner shall be specified by name or company name, including the object of the company, residential address or registered office (branch office) and the names of the executive bodies and officers of the media owner authorized to represent the company and, if there is a supervisory board, its members. In addition, the ownership, shareholding, share and voting rights proportions shall be stated in respect of all persons holding a direct or indirect share in the media owner. Furthermore, any undisclosed shareholdings in media owner and in persons holding a direct or indirect share in the media owner as specified in the previous sentence shall be stated, and fiduciary relationships shall be disclosed for each level. In the case of direct or indirect shareholdings of foundations, the founder and the relevant beneficiaries of the foundation shall be disclosed. If the media owner is an association or an association holds a direct or indirect share in the media owner, the management board and the purpose of the association shall be stated in respect of such association. Persons holding a direct or indirect share, trust makers, founders and beneficiaries of a foundation shall be obligated, upon request by the media owner, to communicate to the media owner the details required for the media owner to comply with his/her/its disclosure obligation.</p>
                        <p>(3) If a person to be disclosed under the aforementioned provisions is also owner of another media undertaking or media service, the name, object and registered office of such company shall also be stated.</p>
                        <p>(4) A declaration on the basic line represented by the periodical print product or any other periodical medium shall also be published. In terms of § 2, any modifications of and additions to the basic line shall not become legally effective before being published.</p>
                        <p>(5) For a medium in terms of § 1 para 1 sub-para 5a b) and c) that does not contain any information exceeding the presentation of the personal lifestyle or the presentation of the media owner, being suitable to influence public opinion, only the name or the company, possibly the object of the company, as well as the residence or the registered office of the media owner are to be indicated. Paras 3 and 4 shall not apply to such media.</p>

                        <br />

                        <h4><b>Part 3</b></h4>
                        <h4>Duties to provide information</h4>
                        <h4>General information</h4>

                        <p>§ 5. (1) A service provider must render at least the following information easily, directly and permanently accessible to users:</p>
                        <ol style={{ paddingLeft: '5vw' }}>
                            <li><p>its name or corporate name;</p> </li>
                            <li><p>the geographic address at which the service provider is established;</p></li>
                            <li><p>information based on which users may contact the service provider rapidly and directly, including the service provider's electronic mail address;</p></li>
                            <li><p>if applicable, the commercial register number and the registration court;</p></li>
                            <li><p>if the activity is subject to administrative supervision, the supervisory authority competent for the service provider;</p></li>
                            <li><p>if the service provider is subject to trade or professional rules, the chamber, professional association or similar institution to which the service provider belongs, the professional title and the Member State where the title has been granted, as well as a reference to the applicable trade and professional rules and the means to access them;</p></li>
                            <li><p>if applicable, the VAT identification number.</p></li>
                        </ol>

                        <p>(2) If prices are listed in information society services, such prices are to be indicated such that an average wary observer may easily read and classify them. It must be unambiguously identifiable whether the prices include turnover tax and all other charges and mark-ups (gross prices) or not. It must also be specified whether shipping costs are included.</p>

                        <p>(3) No other duties to provide information shall be prejudiced hereby.</p>

                        <br />

                        <div style={{ fontStyle: 'italic' }}>
                            <h4><b>Sources</b></h4>
                            <a href="https://www.ris.bka.gv.at/Dokument.wxe?Abfrage=Erv&Dokumentnummer=ERV_1981_314">Austrian Media Act Section 24 and 25</a><br />
                            <a href="https://www.ris.bka.gv.at/Dokument.wxe?Abfrage=Erv&Dokumentnummer=ERV_2001_1_152">Austrian E-Commerce Act Section 5</a><br />
                            <a href="https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32016R0679">DSGV = GDPR  (EU 2016/679)</a><br />
                            <a href="https://www.ris.bka.gv.at/Dokumente/Erv/ERV_1999_1_165/ERV_1999_1_165.html">Austrian Data Protection Act 2000 in its applicable version (DSG 2000)</a><br />
                        </div>
                    </div>
                </div>

            </Styles>
        </>
    );
};
export default Legal;