import React from 'react';
import '../../css/index.css';
import BannerTitle from '../../components/BannerTitle';
import imgMap from '../../assets/mapGreen03.svg'


const HomePage = () => {
	return (
		<>
			<BannerTitle title="The FABLE Consortium" />
			<div>
				<div className="full-width">
					<div className="main-contentAlt">
						<p>
							The Food, Agriculture, Biodiversity, Land-Use, and Energy (FABLE) Consortium is a collaborative initiative created in 2017. FABLE is a global network of researchers who develop national pathways for sustainable food and land-use systems, that are consistent with global sustainability objectives, including the Sustainable Development Goals (SDGs) and the Paris Climate Agreement targets.
						</p>
						<p>
							FABLE mobilizes researchers from leading knowledge institutions across the globe and supports them pathways as decision-support tools for integrated long-term strategies at national and global scales.
						</p>
						<p>
							FABLE brings together independent interdisciplinary teams of researchers from 22 countries.
						</p>
					</div>
					<div className="mapHome">
						<img src={imgMap} ></img>
					</div>
					<div className="main-contentAlt">

						<p>
							<b>Who we are</b>
						</p>
						<p>
							FABLE country teams are at the heart of FABLE's mission. National teams of researchers in more than 22 countries develop national integrated pathways for sustainable food and land-use systems that describe the changes needed to achieve mid-century sustainability objectives. They also engage with national governments to promote ambitious sustainable policies for the food and land-use system.
						</p>
						<p>
							FABLE is coordinated by a Secretariat, led by the Sustainable Development Solutions Network (SDSN), the International Institute for Applied Systems Analysis (IIASA), and the Alliance of Bioversity International and CIAT, in collaboration with the Potsdam Institute for Climate Impact Research (PIK).
						</p>

					</div>
				</div>
				<br />
			</div>
		</>
	);
};

export default HomePage;