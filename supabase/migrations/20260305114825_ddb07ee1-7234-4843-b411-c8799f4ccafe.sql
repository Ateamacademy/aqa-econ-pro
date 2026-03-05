
-- Seed OCR A-Level Economics knowledge nodes into econ_knowledge_nodes
-- From OCR H460 specification, scheme of work, and topic tracker analysis

INSERT INTO public.econ_knowledge_nodes (topic, subtopic, paper, bloom_level, keywords, related_topics, mark_allocation, question_stem, subject)
VALUES
-- Component 1: Microeconomics (H460/01)
-- 1. Introduction to Microeconomics
('The Economic Problem', 'Scarcity, choice, needs and wants', '1', 'understand', ARRAY['scarcity','choice','needs','wants','economic goods','free goods'], ARRAY['Opportunity Cost','Production Possibility Curves'], 4, 'Explain why scarcity requires economic agents to make choices.', 'ocr_economics'),
('The Economic Problem', 'Normative and positive statements', '1', 'understand', ARRAY['normative','positive','value judgements','facts'], ARRAY['Government Intervention','Economic Policy'], 4, 'Distinguish between normative and positive statements in economics.', 'ocr_economics'),
('The Economic Problem', 'Factors of production and rewards', '1', 'understand', ARRAY['land','labour','capital','enterprise','rent','wages','interest','profit'], ARRAY['Labour Market','Market Structures'], 4, 'Explain the four factors of production and their rewards.', 'ocr_economics'),
('Economic Systems', 'Market, planned and mixed economies', '1', 'evaluate', ARRAY['market economy','planned economy','mixed economy','incentives','allocation'], ARRAY['The Economic Problem','Government Intervention'], 9, 'Evaluate the effectiveness of different economic systems in allocating resources.', 'ocr_economics'),
('Opportunity Cost', 'PPF diagrams and trade-offs', '1', 'apply', ARRAY['opportunity cost','trade-off','PPC','PPF','production possibility'], ARRAY['The Economic Problem','Economic Growth'], 4, 'Using a PPC diagram, explain the concept of opportunity cost.', 'ocr_economics'),

-- 2. The Role of Markets
('Demand', 'Individual and market demand', '1', 'apply', ARRAY['demand curve','price','quantity demanded','joint demand','composite demand','competitive demand'], ARRAY['Supply','Market Equilibrium'], 4, 'Explain, with the aid of a diagram, the factors that cause a shift in the demand curve.', 'ocr_economics'),
('Supply', 'Individual and market supply', '1', 'apply', ARRAY['supply curve','price','quantity supplied','joint supply','competitive supply'], ARRAY['Demand','Market Equilibrium'], 4, 'Explain, with the aid of a diagram, the difference between a movement along and a shift of the supply curve.', 'ocr_economics'),
('Consumer and Producer Surplus', 'Effects of price changes', '1', 'evaluate', ARRAY['consumer surplus','producer surplus','welfare','price changes'], ARRAY['Demand','Supply','Market Equilibrium'], 9, 'Evaluate the impact of changes in price on consumer and producer surplus.', 'ocr_economics'),
('Market Equilibrium', 'Interaction of demand and supply', '1', 'apply', ARRAY['equilibrium','disequilibrium','excess demand','excess supply','ceteris paribus'], ARRAY['Demand','Supply','Price Mechanism'], 4, 'Using a diagram, explain how market equilibrium is determined by the interaction of demand and supply.', 'ocr_economics'),
('Elasticity', 'PED, YED, XED, PES', '1', 'analyse', ARRAY['price elasticity','income elasticity','cross elasticity','supply elasticity','revenue'], ARRAY['Demand','Supply','Market Equilibrium'], 9, 'Analyse the significance of price elasticity of demand for a firms pricing decisions.', 'ocr_economics'),
('Market Failure', 'Externalities and welfare loss', '1', 'evaluate', ARRAY['externalities','MSC','MSB','MPC','MPB','welfare loss','deadweight loss'], ARRAY['Government Intervention','Merit Goods','Demerit Goods'], 15, 'Evaluate the extent to which government intervention can correct market failure caused by negative externalities.', 'ocr_economics'),
('Market Failure', 'Public goods and merit goods', '1', 'evaluate', ARRAY['public goods','merit goods','demerit goods','non-excludable','non-rival','information failure'], ARRAY['Government Intervention','Externalities'], 15, 'Evaluate government policies to correct the under-provision of merit goods.', 'ocr_economics'),
('Government Intervention', 'Taxes, subsidies, regulation', '1', 'evaluate', ARRAY['indirect tax','subsidy','regulation','price controls','maximum price','minimum price','buffer stocks'], ARRAY['Market Failure','Externalities','Competition Policy'], 15, 'Evaluate the effectiveness of indirect taxation as a method of correcting market failure.', 'ocr_economics'),
('Government Intervention', 'Government failure', '1', 'evaluate', ARRAY['government failure','unintended consequences','information asymmetry','bureaucracy','regulatory capture'], ARRAY['Market Failure','Competition Policy'], 15, 'Evaluate the view that government intervention to correct market failure often leads to government failure.', 'ocr_economics'),

-- 3. Business Objectives
('Business Objectives', 'Profit maximisation and alternatives', '1', 'evaluate', ARRAY['profit maximisation','revenue maximisation','sales maximisation','satisficing','shareholder','stakeholder'], ARRAY['Market Structures','Costs and Revenue'], 15, 'Evaluate the extent to which firms pursue objectives other than profit maximisation.', 'ocr_economics'),

-- 4. Market Structures
('Market Structures', 'Perfect competition', '1', 'evaluate', ARRAY['perfect competition','price taker','normal profit','supernormal profit','allocative efficiency','productive efficiency'], ARRAY['Business Objectives','Costs and Revenue','Contestable Markets'], 15, 'Evaluate the extent to which perfect competition leads to economic efficiency.', 'ocr_economics'),
('Market Structures', 'Monopoly and monopoly power', '1', 'evaluate', ARRAY['monopoly','barriers to entry','price maker','supernormal profit','deadweight loss','natural monopoly'], ARRAY['Competition Policy','Business Objectives','Perfect Competition'], 15, 'Evaluate the view that monopolies are always against the public interest.', 'ocr_economics'),
('Market Structures', 'Oligopoly and game theory', '1', 'evaluate', ARRAY['oligopoly','interdependence','collusion','cartel','kinked demand','game theory','prisoners dilemma'], ARRAY['Competition Policy','Business Objectives'], 15, 'Evaluate the factors that determine whether oligopolistic firms choose to compete or collude.', 'ocr_economics'),
('Market Structures', 'Contestable markets', '1', 'evaluate', ARRAY['contestable markets','sunk costs','hit and run','barriers to entry','barriers to exit'], ARRAY['Perfect Competition','Monopoly','Oligopoly'], 15, 'Evaluate the significance of contestability in determining market outcomes.', 'ocr_economics'),
('Costs and Revenue', 'Short-run and long-run costs', '1', 'apply', ARRAY['fixed costs','variable costs','marginal cost','average cost','economies of scale','diseconomies of scale','total revenue','marginal revenue'], ARRAY['Market Structures','Business Objectives'], 9, 'Explain the relationship between short-run and long-run cost curves.', 'ocr_economics'),

-- 5. The Labour Market
('Labour Market', 'Wage determination', '1', 'evaluate', ARRAY['wages','marginal revenue product','derived demand','trade unions','monopsony','minimum wage','maximum wage'], ARRAY['Market Failure','Government Intervention','Inequality'], 15, 'Evaluate the impact of a national minimum wage on employment and poverty.', 'ocr_economics'),

-- Component 2: Macroeconomics (H460/02)
-- Aggregate Demand and Supply
('Aggregate Demand', 'Components of AD', '2', 'apply', ARRAY['consumption','investment','government spending','net exports','AD curve','multiplier'], ARRAY['Aggregate Supply','Economic Growth','Fiscal Policy'], 9, 'Using an AD/AS diagram, explain the likely impact of a fall in consumer confidence on the UK economy.', 'ocr_economics'),
('Aggregate Supply', 'SRAS and LRAS', '2', 'evaluate', ARRAY['short run aggregate supply','long run aggregate supply','Keynesian','Classical','productive capacity'], ARRAY['Aggregate Demand','Economic Growth','Supply-Side Policies'], 15, 'Compare the Classical and Keynesian views of the long-run aggregate supply curve.', 'ocr_economics'),
('Economic Growth', 'Actual and potential growth', '2', 'evaluate', ARRAY['actual growth','potential growth','output gap','PPF','sustainable growth','GDP'], ARRAY['Aggregate Demand','Aggregate Supply','Supply-Side Policies'], 15, 'Evaluate the view that economic growth is always desirable.', 'ocr_economics'),
('Inflation', 'Demand-pull and cost-push', '2', 'analyse', ARRAY['demand-pull inflation','cost-push inflation','CPI','RPI','deflation','hyperinflation'], ARRAY['Monetary Policy','Aggregate Demand'], 9, 'Using an AD/AS diagram, analyse the causes and consequences of cost-push inflation.', 'ocr_economics'),
('Unemployment', 'Types and causes', '2', 'evaluate', ARRAY['cyclical unemployment','structural unemployment','frictional unemployment','seasonal unemployment','natural rate','NAIRU'], ARRAY['Labour Market','Fiscal Policy','Supply-Side Policies'], 15, 'Evaluate government policies aimed at reducing structural unemployment.', 'ocr_economics'),
('Balance of Payments', 'Current account', '2', 'analyse', ARRAY['current account','trade balance','capital account','financial account','deficit','surplus'], ARRAY['Exchange Rates','International Trade','Globalisation'], 9, 'Analyse the possible causes of a persistent current account deficit.', 'ocr_economics'),
('Exchange Rates', 'Floating and fixed systems', '2', 'evaluate', ARRAY['floating exchange rate','fixed exchange rate','appreciation','depreciation','Marshall-Lerner','J-curve'], ARRAY['Balance of Payments','International Trade','Monetary Policy'], 15, 'Evaluate the advantages and disadvantages of a floating exchange rate system.', 'ocr_economics'),

-- Implementing Policy
('Fiscal Policy', 'Government spending and taxation', '2', 'evaluate', ARRAY['fiscal policy','budget deficit','national debt','austerity','multiplier','crowding out','Laffer curve'], ARRAY['Monetary Policy','Supply-Side Policies','Aggregate Demand'], 15, 'Evaluate the effectiveness of fiscal policy in achieving macroeconomic stability.', 'ocr_economics'),
('Monetary Policy', 'Interest rates and QE', '2', 'evaluate', ARRAY['monetary policy','interest rates','quantitative easing','Bank of England','MPC','transmission mechanism','liquidity trap'], ARRAY['Fiscal Policy','Inflation','Exchange Rates'], 15, 'Evaluate the effectiveness of monetary policy in controlling inflation.', 'ocr_economics'),
('Supply-Side Policies', 'Market-based and interventionist', '2', 'evaluate', ARRAY['supply-side policies','deregulation','privatisation','education','training','infrastructure','R&D'], ARRAY['Fiscal Policy','Economic Growth','Aggregate Supply'], 15, 'Evaluate the view that supply-side policies are more effective than demand-side policies in promoting economic growth.', 'ocr_economics'),

-- The Global Context
('International Trade', 'Comparative advantage and trade', '2', 'evaluate', ARRAY['comparative advantage','absolute advantage','free trade','protectionism','tariffs','quotas','WTO'], ARRAY['Globalisation','Balance of Payments','Exchange Rates'], 15, 'Evaluate the view that free trade always benefits all countries involved.', 'ocr_economics'),
('Globalisation', 'Benefits and costs', '2', 'evaluate', ARRAY['globalisation','MNCs','FDI','outsourcing','global supply chains','cultural convergence'], ARRAY['International Trade','Development','Inequality'], 15, 'Evaluate the extent to which globalisation has been beneficial for developing countries.', 'ocr_economics'),

-- The Financial Sector
('Financial Sector', 'Role and regulation', '2', 'evaluate', ARRAY['financial sector','banks','financial markets','regulation','deregulation','financial crisis','systemic risk','moral hazard'], ARRAY['Monetary Policy','Globalisation','Economic Growth'], 15, 'Evaluate the role of the financial sector in promoting economic growth.', 'ocr_economics'),

-- Component 3: Themes in Economics (H460/03) - Synoptic
('Synoptic Economics', 'Cross-topic analysis', '3', 'evaluate', ARRAY['synoptic','micro-macro links','policy evaluation','trade-offs','stakeholder analysis'], ARRAY['Market Failure','Economic Growth','Inequality','International Trade','Fiscal Policy'], 25, 'Evaluate the likely economic effects of the UK governments net zero carbon strategy, considering both microeconomic and macroeconomic impacts.', 'ocr_economics'),
('Inequality', 'Income and wealth distribution', '3', 'evaluate', ARRAY['Gini coefficient','Lorenz curve','progressive taxation','benefits','poverty','wealth inequality'], ARRAY['Fiscal Policy','Labour Market','Globalisation'], 15, 'Evaluate policies aimed at reducing income inequality in the UK.', 'ocr_economics'),
('Development', 'Economic development strategies', '3', 'evaluate', ARRAY['economic development','HDI','aid','FDI','microfinance','infrastructure','education'], ARRAY['Globalisation','International Trade','Inequality'], 15, 'Evaluate the effectiveness of foreign aid in promoting economic development.', 'ocr_economics');

-- Seed additional Edexcel question embeddings from parsed topic tracker data
INSERT INTO public.question_embeddings (question_text, marks, topic, bloom_level, tags, year, paper, subject)
VALUES
-- Edexcel A Paper 1 questions from topic tracker
('Using a PPF diagram, explain the concept of opportunity cost.', 8, 'Nature of Economics', 'apply', ARRAY['PPF','opportunity cost','trade-off'], '2024', '1', 'edexcel_a'),
('Explain, using examples, the difference between positive and normative statements.', 5, 'Nature of Economics', 'understand', ARRAY['positive statements','normative statements'], '2022', '1', 'edexcel_a'),
('Using a supply and demand diagram, explain the likely effect of a significant increase in the minimum wage on the UK retail labour market.', 8, 'How Markets Work', 'apply', ARRAY['minimum wage','labour market','supply and demand'], '2024', '1', 'edexcel_a'),
('Using Extract B, calculate the PED for Product X. Comment on its significance.', 5, 'How Markets Work', 'apply', ARRAY['PED','price elasticity','calculation'], '2023', '1', 'edexcel_a'),
('Evaluate the extent to which PED is useful for firms in making pricing decisions.', 15, 'How Markets Work', 'evaluate', ARRAY['PED','pricing decisions','evaluation'], '2021', '1', 'edexcel_a'),
('Evaluate government policies to correct the market failure caused by air pollution.', 20, 'Market Failure', 'evaluate', ARRAY['market failure','externalities','air pollution','government intervention'], '2024', '1', 'edexcel_a'),
('Using a diagram, explain how negative externalities in production lead to a welfare loss.', 8, 'Market Failure', 'analyse', ARRAY['negative externalities','welfare loss','MSC','MPC'], '2023', '1', 'edexcel_a'),
('Evaluate the effectiveness of government intervention in correcting market failure, with reference to the possibility of government failure.', 20, 'Government Intervention', 'evaluate', ARRAY['government intervention','government failure','market failure'], '2024', '1', 'edexcel_a'),
('Evaluate the extent to which consumers benefit from oligopolistic market structures.', 20, 'Market Structures', 'evaluate', ARRAY['oligopoly','consumers','market structures','competition'], '2024', '1', 'edexcel_a'),
('Compare the allocative and productive efficiency of monopoly with perfect competition.', 15, 'Market Structures', 'evaluate', ARRAY['monopoly','perfect competition','efficiency','allocative','productive'], '2023', '1', 'edexcel_a'),
('Using a monopsony diagram, explain why wages in the care sector may be below the competitive equilibrium.', 8, 'Labour Market', 'analyse', ARRAY['monopsony','wages','care sector','labour market'], '2024', '1', 'edexcel_a'),
('Evaluate the likely impact of a significant increase in the National Living Wage on employment and poverty.', 15, 'Labour Market', 'evaluate', ARRAY['minimum wage','NLW','employment','poverty'], '2023', '1', 'edexcel_a'),

-- Edexcel A Paper 2 questions
('Using Extract C, explain two limitations of using GDP as a measure of living standards.', 5, 'Measures of Economic Performance', 'understand', ARRAY['GDP','living standards','limitations'], '2024', '2', 'edexcel_a'),
('Using an AD/AS diagram, analyse the likely impact of a significant rise in interest rates on the UK economy.', 12, 'Aggregate Demand and Supply', 'analyse', ARRAY['AD/AS','interest rates','monetary policy'], '2024', '2', 'edexcel_a'),
('Evaluate the view that economic growth is the most important macroeconomic objective.', 20, 'Economic Growth', 'evaluate', ARRAY['economic growth','objectives','conflicts','trade-offs'], '2024', '2', 'edexcel_a'),
('Evaluate the effectiveness of monetary policy in achieving price stability.', 20, 'Macroeconomic Policy', 'evaluate', ARRAY['monetary policy','price stability','Bank of England','QE'], '2024', '2', 'edexcel_a'),
('Evaluate the use of fiscal policy to reduce income inequality in the UK.', 20, 'Macroeconomic Policy', 'evaluate', ARRAY['fiscal policy','inequality','redistribution','progressive taxation'], '2023', '2', 'edexcel_a'),
('Using the theory of comparative advantage, explain the benefits of free trade.', 8, 'International Trade', 'apply', ARRAY['comparative advantage','free trade','specialisation'], '2024', '2', 'edexcel_a'),
('Evaluate the view that protectionism is never justified.', 20, 'International Trade', 'evaluate', ARRAY['protectionism','tariffs','infant industry','trade wars'], '2023', '2', 'edexcel_a'),
('Evaluate the extent to which globalisation has been beneficial for developing countries.', 20, 'Globalisation', 'evaluate', ARRAY['globalisation','development','FDI','MNCs','inequality'], '2024', '2', 'edexcel_a'),

-- Edexcel A Paper 3 (synoptic) from topic tracker
('Evaluate the likely economic effects of the UK energy market changes, considering both microeconomic and macroeconomic impacts.', 25, 'Synoptic Economics', 'evaluate', ARRAY['energy market','externalities','fiscal policy','trade'], '2024', '3', 'edexcel_a'),
('Evaluate the economic impact of the UK housing market crisis on growth, inequality, and market efficiency.', 25, 'Synoptic Economics', 'evaluate', ARRAY['housing market','supply demand','monetary policy','inequality'], '2023', '3', 'edexcel_a'),

-- Edexcel A untested/weakly tested topics (from topic tracker page 6)
('Explain the functions of money and why money is important in a modern economy.', 5, 'Functions of Money', 'understand', ARRAY['money','medium of exchange','store of value','unit of account'], '2019', '1', 'edexcel_a'),
('Using a diagram, explain the concepts of consumer surplus and producer surplus.', 8, 'Consumer and Producer Surplus', 'apply', ARRAY['consumer surplus','producer surplus','welfare'], '2019', '1', 'edexcel_a'),
('Using a diagram, explain the effects of a maximum price on a market.', 8, 'Government Intervention', 'apply', ARRAY['maximum price','price ceiling','shortage','black market'], '2019', '1', 'edexcel_a'),

-- OCR Economics question embeddings from specification
('Explain the economic problem and how scarcity leads to the need for choice.', 4, 'The Economic Problem', 'understand', ARRAY['scarcity','choice','needs','wants'], '2023', '1', 'ocr_economics'),
('Using a PPC diagram, explain how opportunity cost arises from scarcity.', 4, 'Opportunity Cost', 'apply', ARRAY['PPC','opportunity cost','trade-off'], '2023', '1', 'ocr_economics'),
('Evaluate the effectiveness of incentives on the behaviour of economic agents.', 15, 'Economic Systems', 'evaluate', ARRAY['incentives','economic agents','rationality','market economy'], '2023', '1', 'ocr_economics'),
('Explain, with the aid of a diagram, how consumer surplus is affected by a rise in price.', 9, 'Consumer and Producer Surplus', 'apply', ARRAY['consumer surplus','price rise','welfare'], '2022', '1', 'ocr_economics'),
('Evaluate the impact of changes in demand and supply in one market on a related market.', 15, 'Market Equilibrium', 'evaluate', ARRAY['interrelated markets','demand','supply','substitutes','complements'], '2022', '1', 'ocr_economics'),
('Explain, using diagrams, the difference between price elasticity of demand and income elasticity of demand.', 9, 'Elasticity', 'apply', ARRAY['PED','YED','elasticity','diagrams'], '2023', '1', 'ocr_economics'),
('Evaluate the effectiveness of government policies to correct negative externalities.', 15, 'Market Failure', 'evaluate', ARRAY['negative externalities','pigouvian tax','regulation','tradable permits'], '2023', '1', 'ocr_economics'),
('Evaluate whether monopoly is always against the public interest.', 15, 'Market Structures', 'evaluate', ARRAY['monopoly','public interest','efficiency','innovation','barriers to entry'], '2022', '1', 'ocr_economics'),
('Compare the efficiency outcomes of perfect competition and monopoly using appropriate diagrams.', 15, 'Market Structures', 'evaluate', ARRAY['perfect competition','monopoly','allocative efficiency','productive efficiency'], '2023', '1', 'ocr_economics'),
('Evaluate the factors that determine wage rates in a competitive labour market.', 15, 'Labour Market', 'evaluate', ARRAY['wages','MRP','derived demand','supply of labour','trade unions'], '2022', '1', 'ocr_economics'),
('Using an AD/AS diagram, explain the likely impact of a significant increase in government spending on the UK economy.', 9, 'Aggregate Demand', 'apply', ARRAY['AD/AS','government spending','multiplier','fiscal policy'], '2023', '2', 'ocr_economics'),
('Compare the Classical and Keynesian views of the macroeconomy using AD/AS diagrams.', 15, 'Aggregate Supply', 'evaluate', ARRAY['Classical','Keynesian','LRAS','SRAS','output gap'], '2022', '2', 'ocr_economics'),
('Evaluate the effectiveness of monetary policy in controlling inflation in the UK since 2010.', 15, 'Monetary Policy', 'evaluate', ARRAY['monetary policy','inflation','interest rates','QE','Bank of England'], '2023', '2', 'ocr_economics'),
('Evaluate whether fiscal policy or monetary policy is more effective in promoting economic growth.', 15, 'Fiscal Policy', 'evaluate', ARRAY['fiscal policy','monetary policy','economic growth','policy effectiveness'], '2022', '2', 'ocr_economics'),
('Using the theory of comparative advantage, evaluate the benefits and costs of free trade.', 15, 'International Trade', 'evaluate', ARRAY['comparative advantage','free trade','protectionism','specialisation'], '2023', '2', 'ocr_economics'),
('Evaluate the role of the financial sector in promoting economic stability.', 15, 'Financial Sector', 'evaluate', ARRAY['financial sector','banks','regulation','systemic risk','moral hazard'], '2022', '2', 'ocr_economics'),
('Evaluate the likely economic effects of the UKs net zero carbon strategy on growth, employment, and market efficiency.', 25, 'Synoptic Economics', 'evaluate', ARRAY['net zero','climate change','externalities','growth','employment'], '2023', '3', 'ocr_economics'),
('Evaluate the view that globalisation has increased inequality within developed countries.', 25, 'Synoptic Economics', 'evaluate', ARRAY['globalisation','inequality','wages','trade','development'], '2022', '3', 'ocr_economics');
