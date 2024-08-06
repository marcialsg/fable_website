import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
		height: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    table tr:first-child th:first-child {
        background-color: #006b75;
        color: white;
    }
    table tr:first-child th:last-child {
        background-color: #006b75;
		color: white;
    }

    hr{
        border-top: 2px solid #dddddd!important;
	}
	
	/* top-left border-radius */
	table tr:first-child th:first-child {
		border-top-left-radius: 15px;
	}

	/* top-right border-radius */
	table tr:first-child th:last-child {
		border-top-right-radius: 15px;
	}

	.setBold{
		font-weight: bold;
	}
`;

const TableA = () => {
	return (
		<Styles>
			<table>
				<thead>
					<tr>
						<th>Table A</th>
						<th>Global FABLE Targets</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={{ color: "#066e83" }}><b>AREA</b></td>
						<td style={{ color: "#066e83" }}><b>TARGET</b></td>
					</tr>
					<tr>
						<td><b>Land and biodiversity</b></td>
						<td>
							<p>
								<b>A mininum share of earth's terrestrial land supports biodiversity conservation.</b>No net loss by 2030 and an increase of at least 20% by 2050 in the area of land where natural processes predominate.
							</p>
							<hr />
							<p>
								<b>A minimum share of Earth's terrestrial land is within protected areas.</b> At least 30% of global terrestrial area by 2030.
							</p>
							<hr />
							<p>
								<b>Zero net deforestation.</b> Forest gain should at least compensate for the forest loss at the global level by 2030
							</p>
						</td>
					</tr>
					<tr>
						<td><b>Greenhouse gas emissions from AFOLU</b></td>
						<td>
							<p>
								<b>Greenhouse gas emissions from crops and livestock.</b> Compatible with keeping the rise in average global temperatures to below 1.5°C, which we interpret as below 4GtC0 e yr-1 by 2050 (3.9 Gt for non-C0<sub>2</sub> emissions and 0.1 Gt for C0<sub>2</sub> emissions).
							</p>
							<hr />
							<p>
								<b>Greenhouse gas emissions and removals from Land-Use, Land-Use-Changes, and Forestry (LULUCF).</b> Compatible with keeping the rise in average global temperatures to below 1.5°C. Negative global greenhouse gas emissions from LULUCF by 2050.
							</p>
						</td>
					</tr>
					<tr>
						<td><b>Food security</b></td>
						<td>
							<p>
								<b>Zero hunger.</b> Average daily energy intake per capita higher than the minimum requirement in all countries by 2030-1.
							</p>
							<hr />
							<p>
								<b>Low dietary disease risk.</b> Diet compositions to achieve premature diet related mortality below 5%.
							</p>
						</td>
					</tr>
					<tr>
						<td><b>Freshwater</b></td>
						<td>
							<p>
								<b>Water use in agriculture.</b> Within the limits of internally renewable water resources, taking account of other human water uses and environmental water flows. Blue water use for irrigation {'<'}2453 km<sup>3</sup>yr<sup>-1</sup> (global estimates in the range of 670-4044 km<sup>3</sup>yr<sup>-1</sup>) given future possible range (61-90%) in other competing water uses.
							</p>
						</td>
					</tr>
					<tr>
						<td><b>Nitrogen</b></td>
						<td>
							<p>
								<b>Nitrogen release from agriculture within environmental limits.</b> N use {'<'}69 Tg N yr<sup>-1</sup> total Industrial and agricultural biological fixation (global estimates in the range of 52-133 Tg N yr<sup>-1</sup>) and N loss from agricultural land {'<'}90 Tg N yr<sup>-1</sup> (global estimates in the range of 50-146 Tg N yr<sup>-1</sup>) by 2050.
							</p>
						</td>
					</tr>

					<tr>
						<td><b>Phosphorous</b></td>
						<td>
							<p>
								<b>Phosphorous release from agriculture within environmental limits.</b> P use {'<'}16 Tg P yr<sup>-1</sup> flow from fertilizers to erodible soils (global estimates in the range of 6.2-17 Tg P yr<sup>-1</sup>) and P loss from ag soils human excretion {'<'}8.69 Tg P yr<sup>-1</sup> flow from freshwater systems into ocean by 2050
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		</Styles>
	)
}

export default TableA;